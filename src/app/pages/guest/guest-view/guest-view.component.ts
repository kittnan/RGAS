import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpDocumentVerifiesService } from 'src/app/https/http-document-verifies.service';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
import { HttpReportInformationService } from 'src/app/https/http-report-information.service';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import { LocalStoreService } from 'src/app/services/local-store.service';

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.scss']
})
export class GuestViewComponent implements OnInit {
  show: boolean = true
  userLogin: any
  tempObj = {
    dueDate: null,
    dateSubmitToCustomer: null,
    files: [],
    index: 1,
    status: 'engineer',
  }
  form: any
  form2: any = null
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

  form4: any = {
    revise: null,
    reviseDueDate: null,
    reviseDate: null,
    verify: null,
    verifyDate: null,
    apply: null,
    applyDate: null,
  }
  reportInformation: any = {
    ng: {
      qty: null,
      value1: null,
      value2: null
    },
    notAccepted: {
      qty: null,
      value1: null,
      value2: null
    },
    noAbnormality: {
      qty: null,
      value1: null,
      value2: null
    },
    withinSpec: {
      qty: null,
      value1: null,
      value2: null
    },
    notRecurred: {
      qty: null,
      value1: null,
      value2: null
    },
    difference: {
      qty: null,
      value1: null
    },
    causeByCustomer: null,
    outWarranty: null,
    rootCause: null,
    rootCauseActions: [
      {
        value: null,
        date: null,
        index: 1
      }
    ],
    leakCause: null,
    leakCauseActions: [
      {
        value: null,
        date: null,
        index: 1
      }
    ],
    _id: null
  }
  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private $result: HttpResultService,
    private route: ActivatedRoute,
    private $local: LocalStoreService,
    private $report: HttpReportService,
    private $fileUpload: HttpFileUploadService,
    private $documentVerify: HttpDocumentVerifiesService,
    private $information: HttpReportInformationService

  ) {
    this.route.queryParams.subscribe(async (params: any) => {
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
          const resInformation = await lastValueFrom(this.$information.get(param))
          if (resInformation && resInformation.length > 0) {
            this.reportInformation = resInformation[0]
          }

          const resDocVerify = await lastValueFrom(this.$documentVerify.get(param))
          this.form4 = resDocVerify.length > 0 ? resDocVerify[0] : this.form4
        }
      }
    })
    this.userLogin = this.$local.getProfile()
  }

  ngOnInit(): void {
  }

}
