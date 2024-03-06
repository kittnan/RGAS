import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
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

  modeSelected: any = 'interpreter'
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
    private router: Router
  ) {

    this.userLogin = this.$local.getProfile()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params: any) => {
      this.name = params['name']
      if (params['index'] && params['name'] && params['registerNo']) {
        let httpParams: HttpParams = new HttpParams()
        httpParams = httpParams.set('index', JSON.stringify([params['index']]))
        httpParams = httpParams.set('name', JSON.stringify([params['name']]))
        httpParams = httpParams.set('registerNo', JSON.stringify([params['registerNo']]))
        const resReport = await lastValueFrom(this.$report.get(httpParams))
        if (resReport && resReport.length > 0) {
          this.report = resReport[0]
          console.log("🚀 ~ this.report:", this.report)
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
      case 'interpreter':
        value = 'interpreter'
        break;
      case 'section':
        value = 'sectionHead'
        break;
      case 'engineer':
        value = 'engineer'
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
      this.report['PIC'] = null
      this.report['PICHistory'].push({
        action: 'department',
        user: this.userLogin,
        date: new Date()
      })
      this.report.flow[3]['date'] = new Date()
      this.report.status = 'finish'
      console.log("🚀 ~ this.report:", this.report)
      await lastValueFrom(this.$report.createOrUpdate([this.report]))
      this.router.navigate(['departmentHead/rgas1'])
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  async reject() {
    try {
      this.report['PIC'] = this.sendTo
      this.report['PICHistory'].push({
        action: 'department reject',
        user: this.userLogin,
        date: new Date()
      })

      this.report.status = this.modeSelected
      this.report.flow[3]['date'] = new Date()
      await lastValueFrom(this.$report.createOrUpdate([this.report]))
      this.router.navigate(['departmentHead/rgas1'])
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
