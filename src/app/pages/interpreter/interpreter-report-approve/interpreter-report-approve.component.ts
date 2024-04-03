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
  selector: 'app-interpreter-report-approve',
  templateUrl: './interpreter-report-approve.component.html',
  styleUrls: ['./interpreter-report-approve.component.scss']
})
export class InterpreterReportApproveComponent implements OnInit {

  sendTo: any
  userLogin: any
  userApproveClaimOption: any
  claimId: any
  report: any = {
    flow: []
  }
  claim: any



  constructor(
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private route: ActivatedRoute,
    private $local: LocalStoreService,
    private router: Router,
    private $mail: HttpMailService,
    private dialog: MatDialog,
    private $alert: SweetAlertGeneralService,
    protected $loader: NgxUiLoaderService,
    private $sendMail: SendMailService,
    private $claim: HttpClaimService
  ) {

    this.userLogin = this.$local.getProfile()
  }

  ngOnInit(): void {
    this.getSendToUser()
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
          this.report.flow[2]['PIC'] = this.userLogin
          // this.report.flow[2]['date'] = new Date()
        }
      }
    })
  }

  getSendToUser() {
    this.sendTo = []
    let value = 'departmentHead'
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
      foo = this.$sendMail.toDepartment(this.claim, this.report, this.sendTo)
      let dialogEmail = this.dialog.open(DialogEmailComponent, {
        data: foo
      })
      dialogEmail.afterClosed().subscribe(async (data: any) => {
        if (data === true) {
          this.report['PIC'] = this.sendTo
          this.report['PICHistory'].push({
            action: 'section',
            user: this.userLogin,
            date: new Date(),
            comment: ''

          })
          this.report.status = 'department'
          await lastValueFrom(this.$report.createOrUpdate([this.report]))
          this.$alert.success()
          this.router.navigate(['interpreter/report-view'], { queryParamsHandling: 'preserve' })
        }
      })

      // this.dialog.open(DialogCommentComponent, {
      //   disableClose: true,
      //   data: '',
      // }).afterClosed().subscribe(async (comment: any) => {
      //   if (comment === false) throw ''
      //   this.report['PIC'] = this.sendTo
      //   this.report['PICHistory'].push({
      //     action: 'section',
      //     user: this.userLogin,
      //     date: new Date(),
      //     comment: comment

      //   })
      //   this.report.status = 'department'
      //   await lastValueFrom(this.$report.createOrUpdate([this.report]))
      //   const info = await this.$sendMail.approve(null, comment, this.report.PIC.map((PIC: any) => PIC.email))
      //   this.$alert.success()
      //   this.router.navigate(['interpreter/rgas1'])
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
