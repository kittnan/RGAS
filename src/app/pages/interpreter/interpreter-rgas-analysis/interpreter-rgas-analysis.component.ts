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
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-interpreter-rgas-analysis',
  templateUrl: './interpreter-rgas-analysis.component.html',
  styleUrls: ['./interpreter-rgas-analysis.component.scss']
})
export class InterpreterRgasAnalysisComponent implements OnInit {
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

  pathFile = environment.pathSaveFile
  form4: any = {
    revise: null,
    reviseDueDate: null,
    reviseDate: null,
    verify: null,
    verifyDate: null,
    apply: null,
    applyDate: null,
  }
  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private $result: HttpResultService,
    private route: ActivatedRoute,
    private $local: LocalStoreService,
    private $report: HttpReportService,
    private $fileUpload: HttpFileUploadService,
    private $documentVerify: HttpDocumentVerifiesService
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
          this.form4 =resDocVerify.length > 0 ? resDocVerify[0] : this.form4

        }
      }
    })
    this.userLogin = this.$local.getProfile()
  }


  ngOnInit(): void {
  }

  async uploadChange(event: any) {
    let path = `${this.pathFile}/${this.form.registerNo}/${this.form.no}/${event.key}${event.data.index}/`
    if (event.data._id) {
      const formData: FormData = new FormData()
      formData.append('path', path)
      formData.append('file', event.file)
      const resFile = await lastValueFrom(this.$fileUpload.create(formData))
      let data = this.form3[event.key]
      data['files'] = [...data['files'], ...resFile]
      await lastValueFrom(this.$report.createOrUpdate([data]))
    } else {
      let dataUpdate = {
        registerNo: this.form.registerNo,
        name: event.key,
        ...event.data,
        no: this.form.no
      }
      const resData = await lastValueFrom(this.$report.create([dataUpdate]))
      const formData: FormData = new FormData()
      formData.append('path', path)
      formData.append('file', event.file)
      const resFile = await lastValueFrom(this.$fileUpload.create(formData))
      this.form3[event.key] = resData[0]
      let data = this.form3[event.key]
      data['files'] = [...data['files'], ...resFile]
      await lastValueFrom(this.$report.createOrUpdate([data]))
    }
  }

  async uploadArrChange(event: any) {
    let path = `${this.pathFile}/${this.form.registerNo}/${this.form.no}/${event.key}${event.data.index}/`
    if (event.data._id) {
      const formData: FormData = new FormData()
      formData.append('path', path)
      formData.append('file', event.file)
      const resFile = await lastValueFrom(this.$fileUpload.create(formData))
      let data = this.form3[event.key][event.index]
      data['files'] = [...data['files'], ...resFile]
      await lastValueFrom(this.$report.createOrUpdate([data]))
    } else {
      let dataUpdate = {
        registerNo: this.form.registerNo,
        name: event.key,
        ...event.data,
        no: this.form.no
      }
      const resData = await lastValueFrom(this.$report.create([dataUpdate]))
      const formData: FormData = new FormData()
      formData.append('path', path)
      formData.append('file', event.file)
      const resFile = await lastValueFrom(this.$fileUpload.create(formData))
      this.form3[event.key][event.index] = resData[0]
      let data = this.form3[event.key][event.index]
      data['files'] = [...data['files'], ...resFile]
      await lastValueFrom(this.$report.createOrUpdate([data]))
    }
  }


  async approveChange(event: any) {
    try {
      if (event?.data.status != 'interpreter') {
        this.router.navigate(['interpreter/report-view'], {
          queryParams: {
            registerNo: event.data.registerNo,
            name: event.key,
            index: event.data.index,
            no: event.data.no

          }
        })
      } else {
        // let dataUpdate: any = {
        //   ...event.data,
        //   PICHistory: null,
        //   PIC: null
        // }
        // await lastValueFrom(this.$report.createOrUpdate([dataUpdate]))
        this.router.navigate(['interpreter/report-approve'], {
          queryParams: {
            registerNo: event.data.registerNo,
            name: event.key,
            index: event.data.index,
            no: event.data.no

          }
        })
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  approveArrChange(event: any) {
    try {
      if (event?.data.status != 'interpreter') {
        this.router.navigate(['interpreter/report-view'], {
          queryParams: {
            registerNo: event.data.registerNo,
            name: event.key,
            index: event.data.index,
            no: event.data.no

          }
        })
      } else {
        // let dataUpdate: any = {
        //   ...event.data,
        //   PICHistory: null,
        //   PIC: null
        // }
        // await lastValueFrom(this.$report.createOrUpdate([dataUpdate]))
        this.router.navigate(['interpreter/report-approve'], {
          queryParams: {
            registerNo: event.data.registerNo,
            name: event.key,
            index: event.data.index,
            no: event.data.no

          }
        })
      }

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
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



}
