import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
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
    private $local: LocalStoreService
  ) {
    route.queryParams.subscribe(async (params: any) => {
      if (params['registerNo']) {
        let resData = await lastValueFrom(this.$claim.get(new HttpParams().set('registerNo', JSON.stringify([params['registerNo']])).set('no', JSON.stringify([params['no']]))))
        if (resData && resData.length > 0) {
          this.form = resData[0]
        }
      }
    })
    this.state = this.router.getCurrentNavigation()?.extras.state
    this.userLogin = $local.getProfile()
  }

  async ngOnInit(): Promise<void> {
    try {

      let userParam = new HttpParams().set('access', JSON.stringify(['engineer']))
      this.analysisPICOption = await lastValueFrom(this.$user.get(userParam))
      if (this.state) {
        let resData = await lastValueFrom(this.$claim.get(new HttpParams().set('registerNo', JSON.stringify([this.state.registerNo]))))
        console.log("🚀 ~ resData:", resData)
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
      let flowHistory: FlowHistory = {
        user: this.userLogin,
        action: 'approve-request',
        date: new Date()
      }
      this.form.flowHistory.push(flowHistory)
      this.form.status = 'analysis'
      this.form.flowPIC = [this.userLogin]
      await lastValueFrom(this.$claim.createOrUpdate(this.form))
      Swal.fire({
        title: 'SUCCESS',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['engineer/rgas1'])
      })
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
      this.form.status = 'draft'
      const operator = this.form.flowHistory.find((item: any) => item.action == 'request')
      this.form.flowPIC = [operator.user]
      await lastValueFrom(this.$claim.createOrUpdate(this.form))
      Swal.fire({
        title: 'SUCCESS',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['engineer/rgas1'])
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
}
