import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpDocumentVerifiesService } from 'src/app/https/http-document-verifies.service';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-operator-rgas-analysis',
  templateUrl: './operator-rgas-analysis.component.html',
  styleUrls: ['./operator-rgas-analysis.component.scss']
})
export class OperatorRgasAnalysisComponent implements OnInit {

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
  form4: any = {
    revise: null,
    reviseDueDate: null,
    reviseDate: null,
    verify: null,
    verifyDate: null,
    apply: null,
    applyDate: null,
  }
  pathFile = environment.pathSaveFile

  constructor(
    private $claim: HttpClaimService,
    private route: ActivatedRoute,
    private $result: HttpResultService,
    private $local: LocalStoreService,
    private $alert: SweetAlertGeneralService,
    private $report: HttpReportService,
    private router: Router,
    private $documentVerify: HttpDocumentVerifiesService,
    private $fileUpload: HttpFileUploadService

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
          const resDocVerify = await lastValueFrom(this.$documentVerify.get(param))
          this.form4 = resDocVerify.length > 0 ? resDocVerify[0] : this.form4
        }
      }
    })
    this.userLogin = this.$local.getProfile()

  }

  ngOnInit(): void {
  }

  // todo save event
  async onSaveChange(event: any) {
    try {
      await lastValueFrom(this.$result.createOrUpdate([event]))
      this.$alert.success()
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  async onAutoSaveChange(event:any){
    await lastValueFrom(this.$result.createOrUpdate([event]))

  }


  // todo event submit
  onSubmitChange($event: any) {
    try {
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo event send report
  async submitReportChange(event: any) {
    if (event && event.data._id) {
      await lastValueFrom(this.$report.createOrUpdate([event.data]))
      this.$alert.success()
    } else {
      let dataUpdate = {
        registerNo: this.form.registerNo,
        name: event.key,
        ...event.data,
        no: this.form.no
      }
      const resData = await lastValueFrom(this.$report.create([dataUpdate]))
      this.form3[event.key] = resData[0]
    }

  }
  async submitReportArrChange(event: any) {
    if (event.data._id) {
      await lastValueFrom(this.$report.createOrUpdate([event.data]))
    } else {
      let dataUpdate = {
        registerNo: this.form.registerNo,
        name: event.key,
        ...event.data,
        no: this.form.no
      }
      const resData = await lastValueFrom(this.$report.create([dataUpdate]))
      this.form3[event.key][event.index] = resData[0]
    }
  }

  async onUploadChangeForm2(event: any) {
    try {
      let path = `${this.pathFile}/${this.form.registerNo}/${this.form.no}/${event.key}/`

      if (event.data._id) {
        const formData: FormData = new FormData()
        formData.append('path', path)
        formData.append('file', event.file)
        const resFile = await lastValueFrom(this.$fileUpload.create(formData))
        let data = this.form2[event.key]
        data['files'] = [...data['files'], ...resFile]
        console.log("🚀 ~ data:", data)
        await lastValueFrom(this.$result.createOrUpdate([this.form2]))
      } else {
        let data = {
          registerNo: this.form.registerNo,
          no: this.form.no,
          ...event.data
        }
        const resData = await lastValueFrom(this.$result.create(data))
        this.form2 = resData[0]

        const formData: FormData = new FormData()
        formData.append('path', path)
        formData.append('file', event.file)
        const resFile = await lastValueFrom(this.$fileUpload.create(formData))
        data = this.form2[event.key]
        data['files'] = [...data['files'], ...resFile]
        await lastValueFrom(this.$result.createOrUpdate([this.form2]))
      }

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }


  // todo event approve report
  async approveChange(event: any) {
    this.router.navigate(['operator/report-view'], {
      queryParams: {
        registerNo: event.data.registerNo,
        name: event.key,
        index: event.data.index,
        no: event.data.no
      }
    })
  }

  async approveArrChange(event: any) {
    this.router.navigate(['operator/report-view'], {
      queryParams: {
        registerNo: event.data.registerNo,
        name: event.key,
        index: event.data.index,
        no: event.data.no
      }
    })
  }

  // todo form4 change
  async form4Change(event: any) {
    try {
      Swal.fire({
        title: "Save ?",
        icon: 'question',
        showCancelButton: true,
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          if (event && event._id) {
            await lastValueFrom(this.$documentVerify.createOrUpdate([event]))
          } else {
            let resData = await lastValueFrom(this.$documentVerify.create({
              ...event, registerNo: this.form.registerNo,
              no: this.form.no
            }))
            this.form4 = resData[0]
          }
        }
      })

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo on onCopyChange
  onCopyChange(event: any) {
    let lastItem = event[event.length - 1]
    let auth = this.$local.getAuth()
    this.router.navigate([`operator/information`], {
      queryParams: {
        registerNo: lastItem.registerNo,
        no: lastItem.no
      }
    })
  }


}
