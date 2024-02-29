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
@Component({
  selector: 'app-section-report-approve',
  templateUrl: './section-report-approve.component.html',
  styleUrls: ['./section-report-approve.component.scss']
})
export class SectionReportApproveComponent implements OnInit {
  flowSelected: any = [
    {
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
    }
  ]
  sendTo: any
  userLogin: any
  userApproveClaimOption: any
  claimId: any
  report: any

  modeOption: any = [
    'interpreter',
    'department'
  ]
  modeSelected: any = 'interpreter'

  constructor(
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private route: ActivatedRoute,
    private $local:LocalStoreService
  ) {
    this.$user.get(new HttpParams().set('access', JSON.stringify(['interpreter']))).subscribe((resData: any) => {
      this.userApproveClaimOption = resData
    })
    this.userLogin = this.$local.getProfile()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params['claimId']) {
        this.claimId = params['claimId']
        this.$report.get(new HttpParams().set('claimId', JSON.stringify([params['claimId']]))).subscribe((resData: any) => {
          this.report = resData
          // console.log("🚀 ~ this.report:", this.report)
          // this.flowSelected.map((item: any) => {
          //   const flowHistory = item.repor
          // })
          this.flowSelected[1]['PIC'] = this.userLogin
          console.log("🚀 ~ this.flowSelected:", this.flowSelected)
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
  cssFlow(item: any) {
    if (this.report?.some((f: any) => f.PICHistory.some((his: any) => his.action == item))) return 'card-step-active'
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

  async onChangeFlow() {
    if (this.modeSelected == 'interpreter') {
      const users = await lastValueFrom(this.$user.get(new HttpParams().set('access', JSON.stringify(['interpreter']))))
      this.userApproveClaimOption = users
      this.sendTo = []
    }
    if (this.modeSelected == 'department') {
      const users = await lastValueFrom(this.$user.get(new HttpParams().set('access', JSON.stringify(['departmentHead']))))
      this.userApproveClaimOption = users
      this.sendTo = []
    }
  }

}
