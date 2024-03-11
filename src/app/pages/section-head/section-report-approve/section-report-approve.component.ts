import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { FlowHistory } from 'src/app/shared/rgas2/form1/form1.component';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { flowStep } from '../../engineer/engineer-report-approve/engineer-report-approve.component';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { Location } from '@angular/common';
import { HttpMailService } from 'src/app/https/http-mail.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCommentComponent } from 'src/app/shared/dialog-comment/dialog-comment.component';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SendMailService } from 'src/app/services/send-mail.service';

@Component({
  selector: 'app-section-report-approve',
  templateUrl: './section-report-approve.component.html',
  styleUrls: ['./section-report-approve.component.scss']
})
export class SectionReportApproveComponent implements OnInit {

  userLogin: any
  claimId: any
  report: any = {
    flow: []
  }
  modeSelected: any = 'interpreter'
  modeFlow: any = 'approve'
  modeOption: any = ['interpreter', 'department']
  sendTo: any
  userApproveClaimOption: any
  name: any = null

  // modeOption: any = [
  //   'interpreter',
  //   'department'
  // ]
  // modeSelected: any = 'interpreter'

  constructor(
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private route: ActivatedRoute,
    private $local: LocalStoreService,
    private router: Router,
    private location: Location,
    private $mail: HttpMailService,
    private dialog: MatDialog,
    private $alert: SweetAlertGeneralService,
    private $loader: NgxUiLoaderService,
    private $sendMail: SendMailService

  ) {

    this.userLogin = this.$local.getProfile()
  }

  ngOnInit(): void {
    this.getSendToUser()
    this.route.queryParams.subscribe(async (params: any) => {
      this.name = params['name']
      if (params['index'] && params['name'] && params['registerNo']) {
        let httpParams: HttpParams = new HttpParams()
        httpParams = httpParams.set('index', JSON.stringify([params['index']]))
        httpParams = httpParams.set('name', JSON.stringify([params['name']]))
        httpParams = httpParams.set('registerNo', JSON.stringify([params['registerNo']]))
        httpParams = httpParams.set('no', JSON.stringify([params['no']]))
        const resReport = await lastValueFrom(this.$report.get(httpParams))
        if (resReport && resReport.length > 0) {
          this.report = resReport[0]
          this.report.flow[1]['PIC'] = this.userLogin
          // this.report.flow[1]['date'] = new Date()
        }
      }
    })
  }

  getSendToUser() {
    this.sendTo = []
    let value = ''
    switch (this.modeSelected) {
      case 'interpreter':
        value = 'interpreter'
        break;
      case 'department':
        value = 'departmentHead'
        break;
      case 'engineer':
        value = 'engineer'
        break;

      default:
        break;
    }
    this.$user.get(new HttpParams().set('access', JSON.stringify([value]))).subscribe((resData: any) => {
      this.userApproveClaimOption = resData
    })
  }

  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name
    }
    return ''
  }

  onChangeModeFlow() {
    if (this.modeFlow == 'reject') {
      this.modeOption = []
      this.modeSelected = 'engineer'
      this.getSendToUser()
    }
    if (this.modeFlow == 'approve') {
      this.modeOption = ['interpreter', 'department']
      this.modeSelected = 'interpreter'
      this.getSendToUser()
    }
  }

  onSubmit() {
    Swal.fire({
      title: 'Send?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        if (v.isConfirmed) {
          if (this.modeFlow == 'approve') {
            this.submit()
          }
          if (this.modeFlow == 'reject') {
            this.reject()
          }
        }
      }
    })
  }

  async submit() {
    try {
      this.dialog.open(DialogCommentComponent, {
        disableClose: true,
        data: '',
      }).afterClosed().subscribe(async (comment: any) => {
        if (comment === false) throw ''
        this.report['PIC'] = this.sendTo
        this.report['PICHistory'].push({
          action: 'section',
          user: this.userLogin,
          date: new Date(),
          comment: comment
        })
        this.report.status = this.modeSelected
        // this.report.flow = this.flowSelected
        this.report.flow[1]['date'] = new Date()
        await lastValueFrom(this.$report.createOrUpdate([this.report]))
        const info = await this.$sendMail.approve(null, comment, this.report.PIC.map((PIC: any) => PIC.email))
        this.$alert.success()
        this.router.navigate(['sectionHead/rgas1'])
      })

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  async reject() {
    try {
      this.dialog.open(DialogCommentComponent, {
        disableClose: true,
        data: '',
      }).afterClosed().subscribe(async (comment: any) => {
        if (comment === false) throw ''
        this.report['PIC'] = this.sendTo
        this.report['PICHistory'].push({
          action: 'section reject',
          user: this.userLogin,
          date: new Date()
        })
        this.report.status = 'engineer'

        this.report.flow[3]['date'] = new Date()
        await lastValueFrom(this.$report.createOrUpdate([this.report]))
        const info = await this.$sendMail.reject(null, comment, this.report.PIC.map((PIC: any) => PIC.email))
        this.router.navigate(['sectionHead/rgas1'])
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  cssFlow(item: any) {
    if (this.report?.status == item) return 'card-step-active'
    // if (this.report?.some((f: any) => f.PICHistory.some((his: any) => his.action == item))) return 'card-step-active'
    return ''
  }

  onBack() {
    this.location.back()
  }

  titleComponent() {
    return this.name ? `${this.name} Approve` : 'Approve'
  }



}
