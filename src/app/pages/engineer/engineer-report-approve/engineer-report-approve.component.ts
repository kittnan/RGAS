import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
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

  report: any

  claimId: any

  constructor(
    private router: Router,
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private route: ActivatedRoute
  ) {
    this.$user.get(new HttpParams().set('access', JSON.stringify(['sectionHead']))).subscribe((resData: any) => {
      this.userApproveClaimOption = resData
    })
    let user: any = localStorage.getItem('RGAS_user')
    this.userLogin = user ? JSON.parse(user) : null
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params['claimId']) {
        this.claimId = params['claimId']
        this.$report.get(new HttpParams().set('claimId', JSON.stringify([params['claimId']]))).subscribe((resData: any) => {
          this.report = resData
          // this.flowSelected.map((item: any) => {
          //   const PIC = this.flow.find((f: any) => f.status == item.name)
          //   if (PIC) {
          //     item['PIC'] = PIC
          //   }
          //   return item
          // })
          // this.flowSelected = this.flowSelected.map((flow:any)=>{})
          this.flowSelected[0]['PIC'] = this.userLogin
        })
      }
    })

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
      const reportData = this.report[0]
      let newData: flowStep = {
        claimId: this.claimId,
        data: reportData,
        status: 'section',
        PIC: this.sendTo,
        PICHistory: [flowHistory]
      }
      await lastValueFrom(this.$report.create(newData))
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  cssFlow(item: any) {
    if (this.report?.some((f: any) => f.PICHistory.some((his: any) => his.action == item))) return 'card-step-active'
    return ''
  }


}
