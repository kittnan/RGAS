import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpDocumentVerifiesService } from 'src/app/https/http-document-verifies.service';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
import { HttpReportInformationService } from 'src/app/https/http-report-information.service';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-engineer-rgas-analysis',
  templateUrl: './engineer-rgas-analysis.component.html',
  styleUrls: ['./engineer-rgas-analysis.component.scss']
})
export class EngineerRgasAnalysisComponent implements OnInit {
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
  information: any = {
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
  pathFile = environment.pathSaveFile

  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private $result: HttpResultService,
    private route: ActivatedRoute,
    private $report: HttpReportService,
    private $fileUpload: HttpFileUploadService,
    private $local: LocalStoreService,
    private $alert: SweetAlertGeneralService,
    private $information: HttpReportInformationService,
    private $documentVerify: HttpDocumentVerifiesService
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      if (params['registerNo']) {
        let param: HttpParams = new HttpParams()
        param = param.set('registerNo', JSON.stringify([params['registerNo']]))
        param = param.set('no', JSON.stringify([params['no']]))
        let resData = await lastValueFrom(this.$claim.get(param))
        if (resData && resData.length > 0) {
          const resInformation = await lastValueFrom(this.$information.get(param))
          if (resInformation && resInformation.length > 0) {
            this.information = resInformation[0]
          }
          this.form = resData.length > 0 ? resData[0] : null
          const resResult = await lastValueFrom(this.$result.get(param))
          this.form2 = resResult.length > 0 ? resResult[0] : null
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

  async formChange() {
    this.form.status = 'analysis'
    const resData = await lastValueFrom(this.$claim.createOrUpdate(this.form))
    this.$alert.success()
  }

  // todo save event form2
  async onCreateChangeForm2(event: any) {
    try {
      let data = {
        registerNo: this.form.registerNo,
        no: this.form.no,
        ...event.data
      }
      const resData = await lastValueFrom(this.$result.create(data))
      this.form2 = resData[0]

      this.$alert.success()
    } catch (error) {
      console.log("🚀 ~ error:", error)
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

  async onSaveChangeForm2(event: any) {
    try {
      let data = {
        ...event.data,
        registerNo: this.form.registerNo,
        no: this.form.no
      }
      await lastValueFrom(this.$result.createOrUpdate([data]))
      this.$alert.success()
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
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
    console.log("🚀 ~ event:", event)
    let dataUpdate = {
      registerNo: this.form.registerNo,
      name: event.key,
      ...event.data,
      no: this.form.no
    }
    // const resData = await lastValueFrom(this.$report.create([dataUpdate]))
    // this.form3[event.key] = resData[0]

    // this.router.navigate(['engineer/report-approve'], {
    //   queryParams: {
    //     claimId: this.form._id,
    //     type: 'preReport'
    //   }
    // })

    if (!dataUpdate._id) {
      const res = await lastValueFrom(this.$report.create(dataUpdate))
      this.form3 = res
      this.$alert.success()
    } else {
      await lastValueFrom(this.$report.createOrUpdate([dataUpdate]))
      // this.form3 = event
      this.$alert.success()
    }
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
  async submitReportArrChange(event: any) {
    if (event.data._id) {
      await lastValueFrom(this.$report.createOrUpdate([this.form3[event.key][event.index]]))
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



  // todo event approve report
  async approveChange(event: any) {
    if (event?.data.status != 'engineer') {
      this.router.navigate(['engineer/report-view'], {
        queryParams: {
          registerNo: event.data.registerNo,
          name: event.key,
          index: event.data.index,
          no: event.data.no

        }
      })
    } else {
      let dataUpdate: any = {
        PICHistory: null,
        ...event.data,
        PIC: null
      }
      await lastValueFrom(this.$report.createOrUpdate([dataUpdate]))
      this.router.navigate(['engineer/report-approve'], {
        queryParams: {
          registerNo: dataUpdate.registerNo,
          name: event.key,
          index: dataUpdate.index,
          no: dataUpdate.no

        }
      })
    }
  }

  async approveArrChange(event: any) {
    if (event?.data.status != 'engineer') {
      this.router.navigate(['engineer/report-view'], {
        queryParams: {
          registerNo: event.data.registerNo,
          name: event.key,
          index: event.data.index,
          no: event.data.no
        }
      })
    } else {
      let dataUpdate: any = {
        PICHistory: null,
        ...event.data,
        PIC: null
      }
      await lastValueFrom(this.$report.createOrUpdate([dataUpdate]))
      this.router.navigate(['engineer/report-approve'], {
        queryParams: {
          registerNo: dataUpdate.registerNo,
          name: event.key,
          index: dataUpdate.index,
          no: dataUpdate.no

        }
      })
    }
  }

  // todo deleteArrChange
  deleteArrChange(event: any) {
    try {
      Swal.fire({
        title: 'Delete?',
        icon: 'question',
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          let data = this.form3[event.key][event.index];
          if (data && data._id) {
            if (data.files && data.files.length > 0) {
              for (let index = 0; index < data.files.length; index++) {
                const file = data.files[index];
                if (index + 1 == data.files.length) {
                  await lastValueFrom(this.$fileUpload.delete({
                    path_file: file.delete_path
                  }))
                  await lastValueFrom(this.$report.delete({ _id: data._id }))
                  this.form3[event.key] = this.form3[event.key].filter((item: any) => item.index != data.index)
                }
              }
            } else {
              await lastValueFrom(this.$report.delete({ _id: data._id }))
              this.form3[event.key] = this.form3[event.key].filter((item: any) => item.index != data.index)
            }


          }
        }
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);

    }
  }

  // todo informationChange
  reportInformationChange(event: any) {
    try {
      Swal.fire({
        title: 'Save?',
        icon: 'question',
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          if (!event._id) {
            this.information = await lastValueFrom(this.$information.create({ ...event, registerNo: this.form.registerNo, no: this.form.no }))
            this.$alert.success()
          } else {
            await lastValueFrom(this.$information.createOrUpdate([event]))
            this.$alert.success()
          }
        }
      })
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

  // todo finish claim report
  onFinish() {
    try {
      Swal.fire({
        title: "Finish ?",
        icon: 'question',
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          await lastValueFrom(this.$claim.createOrUpdate({ ...this.form, status: 'finish' }))
          Swal.fire({
            title:"Success",
            icon:'success',
            showConfirmButton:false,
            timer:1500
          })
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}
