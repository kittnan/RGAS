import { Location } from '@angular/common';
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
import { FlowHistory } from 'src/app/shared/rgas2/form1/form1.component';
import Swal, { SweetAlertResult } from 'sweetalert2';

export interface flowStep {
  status: string,
  claimId: string,
  _id?: string,
  data: object,
  PIC: [],
  PICHistory: FlowHistory[]
}

@Component({
  selector: 'app-engineer-report-approve',
  templateUrl: './engineer-report-approve.component.html',
  styleUrls: ['./engineer-report-approve.component.scss']
})
export class EngineerReportApproveComponent implements OnInit {

  flowSelected: any = [
    {
      name: 'engineer',
      PIC: null,
      date: null
    },
    {
      name: 'section',
      PIC: null,
      date: null
    },
    {
      name: 'interpreter',
      PIC: null,
      date: null
    },
    {
      name: 'department',
      PIC: null,
      date: null
    }
  ]
  sendTo: any
  userApproveClaimOption: any
  userLogin: any

  report: any
  claim: any
  claimId: any

  modeSelected: any = 'section'
  modeFlow: any = 'approve'
  modeOption: any = ['section', 'department']
  constructor(
    private router: Router,
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private route: ActivatedRoute,
    private $local: LocalStoreService,
    private location: Location,
    private $alert: SweetAlertGeneralService,
    private dialog: MatDialog,
    private $loader: NgxUiLoaderService,
    private $sendMail: SendMailService,
    private $claim: HttpClaimService
  ) {
    this.$user.get(new HttpParams().set('access', JSON.stringify(['sectionHead']))).subscribe((resData: any) => {
      this.userApproveClaimOption = resData
    })
    this.userLogin = this.$local.getProfile()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params: any) => {
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
          if (this.report && this.report.flow.length == 0) {
            this.report.flow = this.flowSelected
          }
          this.report.flow[0]['PIC'] = this.userLogin
          // this.flowSelected[0]['date'] = new Date()
        }
      }

    })

  }
  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name
    }
    return ''
  }

  getSendToUser() {
    this.sendTo = []
    let value: any = ''
    switch (this.modeSelected) {
      case 'interpreter':
        value = ['interpreter']
        break;
      case 'section':
        value = ['sectionHead']
        break;
      case 'department':
        value = ['departmentHead']
        break;
      default:
        break;
    }
    this.$user.get(new HttpParams().set('access', JSON.stringify(value))).subscribe((resData: any) => {
      this.userApproveClaimOption = resData
    })
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
        this.submit()
      }
    })
  }

  async submit() {
    try {
      let foo: any
      if (this.modeFlow == 'reject') {
        foo = this.$sendMail.toOperator(this.claim, this.report, this.sendTo)
      }
      if (this.modeFlow == 'approve') {
        if (this.modeSelected == 'section') {
          foo = this.$sendMail.toSection(this.claim, this.report, this.sendTo)
        }
        if (this.modeSelected == 'department') {
          foo = this.$sendMail.toDepartment(this.claim, this.report, this.sendTo)
        }

      }
      let dialogEmail = this.dialog.open(DialogEmailComponent, {
        data: foo,
        hasBackdrop: true,
        disableClose:true
      })
      dialogEmail.afterClosed().subscribe(async (data: any) => {
        if (data === true) {
          this.report['PIC'] = this.sendTo
          this.report['PICHistory'] = this.report['PICHistory'] ? [...this.report['PICHistory'], {
            action: 'engineer',
            user: this.userLogin,
            date: new Date(),
            comment: ''
          }] : [{
            action: 'engineer',
            user: this.userLogin,
            date: new Date(),
            comment: ''
          }]
          this.report.flow = this.flowSelected
          this.report.flow[0]['date'] = new Date()
          this.report.status = this.modeSelected
          console.log("🚀 ~ this.report:", this.report)
          await lastValueFrom(this.$report.createOrUpdate([this.report]))
          this.$alert.success()
          this.router.navigate(['engineer/report-view'], { queryParamsHandling: 'preserve' })
        }
      })
      // this.dialog.open(DialogCommentComponent, {
      //   disableClose: true,
      //   data: '',
      // }).afterClosed().subscribe(async (comment: any) => {
      //   if (comment === false) throw ''
      //   this.report['PIC'] = this.sendTo

      //   this.report['PICHistory'] = this.report['PICHistory'] ? [...this.report['PICHistory'], {
      //     action: 'engineer',
      //     user: this.userLogin,
      //     date: new Date(),
      //     comment: comment
      //   }] : [{
      //     action: 'engineer',
      //     user: this.userLogin,
      //     date: new Date(),
      //     comment: comment
      //   }]
      //   console.log(this.report);

      //   this.report.flow = this.flowSelected
      //   this.report.flow[0]['date'] = new Date()
      //   this.report.status = 'section'
      //   await lastValueFrom(this.$report.createOrUpdate([this.report]))
      //   const info = await this.$sendMail.approve({ registerNo: this.report.registerNo, no: this.report.no }, comment, this.report.PIC.map((PIC: any) => PIC.email))
      //   this.$alert.success()
      //   this.router.navigate(['engineer/rgas1'])
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

  onBack() {
    this.location.back()
  }


}
