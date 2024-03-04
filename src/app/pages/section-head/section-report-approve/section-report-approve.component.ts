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
  report: any = {
    flow: []
  }

  modeOption: any = [
    'interpreter',
    'department'
  ]
  modeSelected: any = 'interpreter'

  constructor(
    private $user: HttpUsersService,
    private $report: HttpReportService,
    private route: ActivatedRoute,
    private $local: LocalStoreService,
    private router: Router
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
        const resReport = await lastValueFrom(this.$report.get(httpParams))
        if (resReport && resReport.length > 0) {
          this.report = resReport[0]
          console.log("🚀 ~ this.report:", this.report)
          this.report.flow[1]['PIC'] = this.userLogin
          this.report.flow[1]['date'] = new Date()
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
      this.report['PIC'] = this.sendTo
      this.report['PICHistory'].push({
        action: 'section',
        user: this.userLogin,
        date: new Date()
      })
      this.report.status = this.modeSelected
      // this.report.flow = this.flowSelected
      console.log("🚀 ~ this.report:", this.report)
      await lastValueFrom(this.$report.createOrUpdate([this.report]))
      // this.router.navigate(['engineer/rgas1'])
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
