import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';

@Component({
  selector: 'app-department-rgas-analysis',
  templateUrl: './department-rgas-analysis.component.html',
  styleUrls: ['./department-rgas-analysis.component.scss']
})
export class DepartmentRgasAnalysisComponent implements OnInit {

  show: boolean = true
  form: any = null
  userLogin: any
  form2: any = null
  tempObj = {
    dueDate: null,
    dateSubmitToCustomer: null,
    files: [],
    index: 1,
    status: 'engineer',
  }
  form3: any = {
    preReport: { ...this.tempObj },
    interims: [
      { ...this.tempObj, }
    ],
    finalReport: { ...this.tempObj },
    finalReportOBL: { ...this.tempObj },
    questionAnswers: [
      { ...this.tempObj, }
    ],
    ng: null,
    rootCauseActions: [
      {
        value: null,
        date: null,
      }
    ],
    leakCauseActions: [
      {
        value: null,
        date: null,
      }
    ],
  }
  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private $result: HttpResultService,
    private route: ActivatedRoute,
    private $user: HttpUsersService,
    private $local: LocalStoreService,
    private $report: HttpReportService
  ) {
    route.queryParams.subscribe(async (params: any) => {
      if (params['registerNo']) {
        let param: HttpParams = new HttpParams()
        param = param.set('registerNo', JSON.stringify([params['registerNo']]))
        param = param.set('no', JSON.stringify([params['no']]))

        let resData = await lastValueFrom(this.$claim.get(param))
        if (resData && resData.length > 0) {
          this.form = resData[0]
          const resResult = await lastValueFrom(this.$result.get(param))
          this.form2 = resResult[0]
          const resForm3 = await lastValueFrom(this.$report.get(param))
          const preReport = resForm3.find((item: any) => item.name == 'preReport')
          const interims = resForm3.filter((item: any) => item.name == 'interims')
          const finalReport = resForm3.find((item: any) => item.name == 'finalReport')
          const finalReportOBL = resForm3.find((item: any) => item.name == 'finalReportOBL')
          const questionAnswers = resForm3.filter((item: any) => item.name == 'questionAnswers')
          this.form3 = {
            ...this.form3,
            preReport: preReport ? preReport : this.form3.preReport,
            interims: interims && interims.length > 0 ? interims : this.form3.interims,
            finalReport: finalReport ? finalReport : this.form3.finalReport,
            finalReportOBL: finalReportOBL ? finalReportOBL : this.form3.finalReportOBL,
            questionAnswers: questionAnswers && questionAnswers.length > 0 ? questionAnswers : this.form3.questionAnswers,
          }
          console.log(this.form3);

        }
      }
    })
    this.userLogin = this.$local.getProfile()
  }


  ngOnInit(): void {
  }


  async approveChange(event: any) {
    try {
      console.log("🚀 ~ event:", event)
      if (event?.data.status != 'department') {
        this.router.navigate(['departmentHead/report-view'], {
          queryParams: {
            registerNo: event.data.registerNo,
            name: event.key,
            index: event.data.index
          }
        })
      } else {
        // let dataUpdate: any = {
        //   ...event.data,
        //   PICHistory: null,
        //   PIC: null
        // }
        // await lastValueFrom(this.$report.createOrUpdate([dataUpdate]))
        this.router.navigate(['departmentHead/report-approve'], {
          queryParams: {
            registerNo: event.data.registerNo,
            name: event.key,
            index: event.data.index
          }
        })
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  approveArrChange(event: any) {
    try {
      console.log("🚀 ~ event:", event)

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
}
