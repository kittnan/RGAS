import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpMailService } from 'src/app/https/http-mail.service';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { SendMailService } from 'src/app/services/send-mail.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { DialogCommentComponent } from 'src/app/shared/dialog-comment/dialog-comment.component';
import { DialogEmailComponent } from 'src/app/shared/dialog-email/dialog-email.component';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-department-report-approve',
  templateUrl: './department-report-approve.component.html',
  styleUrls: ['./department-report-approve.component.scss']
})
export class DepartmentReportApproveComponent implements OnInit {

  userLogin: any
  claimId: any
  report: any = {
    flow: []
  }
  claim: any
  modeSelected: any = 'engineer'
  modeFlow: any = 'approve'
  modeOption: any = []
  sendTo = []
  userApproveClaimOption: any = []

  name: any = null
  constructor(
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private route: ActivatedRoute,
    private $local: LocalStoreService,
    private router: Router,
    private $mail: HttpMailService,
    private dialog: MatDialog,
    private $alert: SweetAlertGeneralService,
    private $loader: NgxUiLoaderService,
    private $sendMail: SendMailService,
    private $claim: HttpClaimService
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
        const resClaim = await lastValueFrom(this.$claim.get(httpParams))
        if (resReport && resReport.length > 0 && resClaim && resClaim.length > 0) {
          this.report = resReport[0]
          this.claim = resClaim[0]
          this.report.flow[3]['PIC'] = this.userLogin
          // this.report.flow[3]['date'] = new Date()
        }
      }
    })
  }

  titleComponent() {
    return this.name ? `${this.name} Approve` : 'Approve'
  }


  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name
    }
    return ''
  }

  onChangeModeFlow() {
    this.sendTo = []
    if (this.modeFlow == 'reject') {
      this.modeOption = ['interpreter', 'section', 'engineer']
      this.modeSelected = 'interpreter'
      this.getSendToUser()
    }
  }

  getSendToUser() {
    this.sendTo = []
    let value = ''
    switch (this.modeSelected) {
      case 'engineer':
        value = 'engineer'
        break;
      case 'interpreter':
        value = 'interpreter'
        break;
      case 'section':
        value = 'sectionHead'
        break;

      default:
        break;
    }
    this.$user.get(new HttpParams().set('access', JSON.stringify([value]))).subscribe((resData: any) => {
      this.userApproveClaimOption = resData
    })
  }

  onSubmit() {
    Swal.fire({
      title: 'Send?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        if (this.modeFlow == 'approve') {
          this.submit()
        }
        if (this.modeFlow == 'reject') {
          this.reject()
        }
      }
    })
  }

  async submit() {
    try {

      // this.dialog.open(DialogCommentComponent, {
      //   disableClose: true,
      //   data: '',
      // }).afterClosed().subscribe(async (comment: any) => {
      //   if (comment === false) throw ''
      this.report['PIC'] = null
      this.report['PICHistory'].push({
        action: 'department',
        user: this.userLogin,
        date: new Date(),
        comment: ''

      })
      this.report.flow[3]['date'] = new Date()
      this.report.status = 'finish'
      await lastValueFrom(this.$report.createOrUpdate([this.report]))
      this.$alert.success()
      this.router.navigate(['departmentHead/report-view'], { queryParamsHandling: 'preserve' })
      // })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  async reject() {
    try {
      let foo: any
      if (this.modeSelected == 'interpreter') {
        foo = this.$sendMail.toInterpreter(this.claim, this.report, this.sendTo)
      }
      if (this.modeSelected == 'section') {
        foo = this.$sendMail.toSection(this.claim, this.report, this.sendTo)
      }
      if (this.modeSelected == 'engineer') {
        foo = this.$sendMail.toEngineer(this.claim, this.report, this.sendTo)
      }
      let dialogEmail = this.dialog.open(DialogEmailComponent, {
        data: foo
      })
      dialogEmail.afterClosed().subscribe(async (data: any) => {
        if (data !== false) {
          this.report['PIC'] = this.sendTo
          this.report['PICHistory'].push({
            action: 'department reject',
            user: this.userLogin,
            date: new Date(),
            comment: ''
          })
          this.report.status = this.modeSelected
          this.report.flow[3]['date'] = new Date()
          await lastValueFrom(this.$report.createOrUpdate([this.report]))
          this.router.navigate(['departmentHead/report-view'], { queryParamsHandling: 'preserve' })
        }
      })

      // this.dialog.open(DialogCommentComponent, {
      //   disableClose: true,
      //   data: '',
      // }).afterClosed().subscribe(async (comment: any) => {
      //   if (comment === false) throw ''
      //   this.report['PIC'] = this.sendTo
      //   this.report['PICHistory'].push({
      //     action: 'department reject',
      //     user: this.userLogin,
      //     date: new Date(),
      //     comment: comment
      //   })
      //   this.report.status = this.modeSelected
      //   this.report.flow[3]['date'] = new Date()
      //   await lastValueFrom(this.$report.createOrUpdate([this.report]))
      //   const info = await this.$sendMail.approve(null, comment, this.report.PIC.map((PIC: any) => PIC.email))
      //   this.router.navigate(['departmentHead/rgas1'])
      // })

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  cssFlow(item: any) {
    if (this.report?.status == item) return 'card-step-active'
    // if (this.report?.some((f: any) => f.PICHistory.some((his: any) => his.action == item))) return 'card-step-active'
    return ''
  }

}
