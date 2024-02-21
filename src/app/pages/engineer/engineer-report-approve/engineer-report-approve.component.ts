import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { ReportDataService } from 'src/app/services/report-data.service';
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

  modeOption = [
    'interpreter',
    'section head'
  ]
  modeSelect: any = 'interpreter'
  flowSelected: any = [{
    name: 'engineer'
  },
  {
    name: 'section'
  },
  {
    name: 'interpreter'
  },
  {
    name: 'department'
  },]
  sendTo: any
  userApproveClaimOption: any
  userLogin: any

  flow: any
  constructor(
    private router: Router,
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private _reportData: ReportDataService,
    private route: ActivatedRoute
  ) {
    this.$user.get(new HttpParams().set('access', JSON.stringify(['sectionHead']))).subscribe((resData: any) => {
      this.userApproveClaimOption = resData
    })
    let user: any = localStorage.getItem('RGAS_user')
    this.userLogin = user ? JSON.parse(user) : null

    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      if (params['claimId']) {
        this.$report.get(new HttpParams().set('claimId', JSON.stringify([params['claimId']]))).subscribe((resData: any) => {
          console.log(resData);
          this.flow = resData
          this.flowSelected = this.flowSelected.map((flow:any)=>{})
        })
      }
    })
  }

  ngOnInit(): void {
  }
  // todo show user login name
  displayName(user: any) {
    if (user) {
      let firstName = user.firstName ? user.firstName : ''
      let lastName = user.lastName ? user.lastName[0] : ''
      return `${firstName}-${lastName}`
    }
    return ''
  }
  onSubmit() {
    Swal.fire({
      title: 'Do you want to send?',
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
      const flowHistory: FlowHistory = {
        action: 'engineer',
        date: new Date,
        user: this.userLogin
      }
      const reportData = this._reportData.get()
      let newData: flowStep = {
        claimId: reportData.claimId,
        data: reportData,
        status: 'engineer',
        PIC: this.sendTo,
        PICHistory: [flowHistory]
      }
      console.log(newData);
      await lastValueFrom(this.$report.create(newData))
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  cssFlow(item: any) {
    if (this.flow?.some((f: any) => f.status == item)) return 'card-step-active'
    return ''
  }


}
