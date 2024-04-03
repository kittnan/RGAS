import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpMailService } from 'src/app/https/http-mail.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { SendMailService } from 'src/app/services/send-mail.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { DialogCommentComponent } from 'src/app/shared/dialog-comment/dialog-comment.component';
import { DialogEmailComponent } from 'src/app/shared/dialog-email/dialog-email.component';
import { FlowHistory } from 'src/app/shared/rgas2/form1/form1.component';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-engineer-approve-claim',
  templateUrl: './engineer-approve-claim.component.html',
  styleUrls: ['./engineer-approve-claim.component.scss']
})
export class EngineerApproveClaimComponent implements OnInit {

  form: any
  state: any
  sendTo: any

  // todo analysis PIC option
  analysisPICOption: any[] = []
  // todo user login
  userLogin: any
  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private route: ActivatedRoute,
    private $user: HttpUsersService,
    private $local: LocalStoreService,
    private $alert: SweetAlertGeneralService,
    private $mail: HttpMailService,
    private dialog: MatDialog,
    private sendMail: SendMailService
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      if (params['registerNo']) {
        let resData = await lastValueFrom(this.$claim.get(new HttpParams().set('registerNo', JSON.stringify([params['registerNo']])).set('no', JSON.stringify([params['no']]))))
        if (resData && resData.length > 0) {
          this.form = resData[0]
        }
      }
    })
    this.state = this.router.getCurrentNavigation()?.extras.state
    this.userLogin = this.$local.getProfile()
  }

  async ngOnInit(): Promise<void> {
    try {

      let userParam = new HttpParams().set('access', JSON.stringify(['engineer']))
      this.analysisPICOption = await lastValueFrom(this.$user.get(userParam))
      if (this.state) {
        let resData = await lastValueFrom(this.$claim.get(new HttpParams().set('registerNo', JSON.stringify([this.state.registerNo]))))
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    if (option._id && value._id) {
      return option._id === value._id;
    }
    return false
  }
  onClickApprove() {
    try {
      Swal.fire({
        title: "Approve?",
        icon: 'question',
        showCancelButton: true
      }).then((v: SweetAlertResult) => {
        if (v.isConfirmed) {
          this.approve()
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  async approve() {
    try {

      let foo = this.sendMail.toClaimInformation(this.form, this.sendTo)
      let dialogEmail = this.dialog.open(DialogEmailComponent, {
        data: foo
      })

      dialogEmail.afterClosed().subscribe(async (data) => {
        if (data !== false) {
          let flowHistory: FlowHistory = {
            user: this.userLogin,
            action: 'approve-request',
            date: new Date(),
            comment: ''
          }
          this.form.flowHistory.push(flowHistory)
          this.form.status = 'analysis'
          this.form.flowPIC = [this.userLogin]
          await lastValueFrom(this.$claim.createOrUpdate(this.form))
          let auth = this.$local.getAuth()
          this.$alert.success()
          this.router.navigate([`${auth}/rgas1`]).then(() => location.reload())
        }
      })

      // this.dialog.open(DialogCommentComponent, {
      //   disableClose: true,
      //   data: '',
      // }).afterClosed().subscribe(async (comment: any) => {

      //   let flowHistory: FlowHistory = {
      //     user: this.userLogin,
      //     action: 'approve-request',
      //     date: new Date(),
      //     comment: comment
      //   }
      //   this.form.flowHistory.push(flowHistory)
      //   this.form.status = 'analysis'
      //   this.form.flowPIC = [this.userLogin]
      //   await lastValueFrom(this.$claim.createOrUpdate(this.form))
      //   let to: any = this.form.flowPIC.map((PIC: any) => PIC.email)
      //   let html = `<p><strong>Dear...All</strong></p>

      // <p>&nbsp;</p>

      // <p><strong>We&#39;d like to share claim information from $type $occurredLocation $qty&nbsp;</strong></p>

      // <p><strong>Please see the detail below and attached file</strong><br />
      // &nbsp;</p>

      // <p><strong><span style="color:#7FFFD4">${comment}</span></strong></p>

      // <p><strong>Model&nbsp; : </strong>$modelCode</p>

      // <p><strong>Q&#39;ty </strong>: $qty</p>

      // <p><strong>Lot :</strong>&nbsp;$productLotNo</p>

      // <p><strong>Serial :</strong>&nbsp;$serial</p>

      // <p><strong>Failure phenomenon :</strong>&nbsp; $failure</p>

      // <p><strong>Occurrence place :</strong>&nbsp;$occur</p>

      // <p><strong>Driving kilometer :</strong>&nbsp;$text</p>

      // <p>&nbsp;</p>

      // <p><strong>Attached, you will find the necessary documentation for further investigation. Please review it promptly and take appropriate actions to address this matter.</strong></p>

      // <p>Click here ➡️ $link</p>

      // <p>&nbsp;</p>

      // <p><strong><span style="color:#c0392b">Please note that this email is automatically generated. Kindly refrain from replying directly to it.</span></strong></p>

      // <p><strong><span style="color:#c0392b">Thank you for your attention to this urgent matter.</span></strong></p>

      // <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>
      // `

      //   let type = this.form.type
      //   html = html.replace('$type', type)
      //   let qty = Number(this.form.qty) > 1 ? `${Number(this.form.qty)} pcs.` : `${Number(this.form.qty)} pc.`
      //   html = html.replace('$qty', qty)


      //   await lastValueFrom(this.$mail.send({
      //     to: to,
      //     html: html
      //   }))


      //   this.$alert.success()
      //   this.router.navigate(['engineer/rgas1'])
      // })


    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onClickReject() {
    try {
      Swal.fire({
        title: 'Reject?',
        icon: 'question',
        showCancelButton: true
      }).then((v: SweetAlertResult) => {
        if (v.isConfirmed) {
          this.reject()
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  async reject() {
    try {
      let flowHistory: FlowHistory = {
        user: this.userLogin,
        action: 'reject-request',
        date: new Date()
      }
      this.form.flowHistory.push(flowHistory)
      this.form.status = 'receive information'
      const operator = this.form.flowHistory.find((item: any) => item.action == 'request')
      this.form.flowPIC = [operator.user]
      await lastValueFrom(this.$claim.createOrUpdate(this.form))
      this.$alert.success()
      this.router.navigate(['engineer/rgas1'])

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
}
