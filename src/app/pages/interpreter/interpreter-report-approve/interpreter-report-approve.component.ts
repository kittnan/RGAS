import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpMailService } from 'src/app/https/http-mail.service';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { DialogCommentComponent } from 'src/app/shared/dialog-comment/dialog-comment.component';
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



  constructor(
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private route: ActivatedRoute,
    private $local: LocalStoreService,
    private router: Router,
    private $mail: HttpMailService,
    private dialog: MatDialog,
    private $alert: SweetAlertGeneralService,
    protected $loader:NgxUiLoaderService
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
        if (resReport && resReport.length > 0) {
          this.report = resReport[0]
          console.log("🚀 ~ this.report:", this.report)
          this.report.flow[2]['PIC'] = this.userLogin
          this.report.flow[2]['date'] = new Date()
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
      this.dialog.open(DialogCommentComponent, {
        disableClose: true,
        data: '',
      }).afterClosed().subscribe(async (comment: any) => {
        this.report['PIC'] = this.sendTo
        this.report['PICHistory'].push({
          action: 'section',
          user: this.userLogin,
          date: new Date(),
          comment: comment

        })
        this.report.status = 'department'
        console.log("🚀 ~ this.report:", this.report)
        await lastValueFrom(this.$report.createOrUpdate([this.report]))
        this.$loader.start()
        let to: any = this.report.PIC.map((PIC: any) => PIC.email)
        let html = `<p><strong>Dear...All</strong></p>

       <p>&nbsp;</p>

       <p><strong>We&#39;d like to share claim information from $type $occurredLocation $qty&nbsp;</strong></p>

       <p><strong>Please see the detail below and attached file</strong><br />
       &nbsp;</p>

       <p><strong><span style="color:#7FFFD4">${comment}</span></strong></p>

       <p><strong>Model&nbsp; : </strong>$modelCode</p>

       <p><strong>Q&#39;ty </strong>: $qty</p>

       <p><strong>Lot :</strong>&nbsp;$productLotNo</p>

       <p><strong>Serial :</strong>&nbsp;$serial</p>

       <p><strong>Failure phenomenon :</strong>&nbsp; $failure</p>

       <p><strong>Occurrence place :</strong>&nbsp;$occur</p>

       <p><strong>Driving kilometer :</strong>&nbsp;$text</p>

       <p>&nbsp;</p>

       <p><strong>Attached, you will find the necessary documentation for further investigation. Please review it promptly and take appropriate actions to address this matter.</strong></p>

       <p>Click here ➡️ $link</p>

       <p>&nbsp;</p>

       <p><strong><span style="color:#c0392b">Please note that this email is automatically generated. Kindly refrain from replying directly to it.</span></strong></p>

       <p><strong><span style="color:#c0392b">Thank you for your attention to this urgent matter.</span></strong></p>

       <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>
       `
        await lastValueFrom(this.$mail.send({
          to: to,
          html: html
        }))
        this.$alert.success()
        this.$loader.stop()
        this.router.navigate(['interpreter/rgas1'])
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


}
