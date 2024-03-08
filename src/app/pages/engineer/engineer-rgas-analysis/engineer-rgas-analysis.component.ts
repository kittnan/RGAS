import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
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

  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private $result: HttpResultService,
    private route: ActivatedRoute,
    private $report: HttpReportService,
    private $fileUpload: HttpFileUploadService,
    private $local: LocalStoreService,
    private $alert: SweetAlertGeneralService
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      if (params['registerNo']) {
        let param: HttpParams = new HttpParams()
        param = param.set('registerNo', JSON.stringify([params['registerNo']]))
        param = param.set('no', JSON.stringify([params['no']]))
        let resData = await lastValueFrom(this.$claim.get(param))
        if (resData && resData.length > 0) {
          this.form = resData[0]
          console.log("🚀 ~ this.form:", this.form)
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
    console.log("🚀 ~ resData:", resData)
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
  async submitReportChange($event: any) {
    let dataUpdate = {
      registerNo: this.form.registerNo,
      name: $event.key,
      ...$event.data,
      no: this.form.no
    }
    const resData = await lastValueFrom(this.$report.create([dataUpdate]))
    this.form3[$event.key] = resData[0]

    // this.router.navigate(['engineer/report-approve'], {
    //   queryParams: {
    //     claimId: this.form._id,
    //     type: 'preReport'
    //   }
    // })
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
      console.log("🚀 ~ data:", data)
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
        ...event.data,
        PICHistory: null,
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
        ...event.data,
        PICHistory: null,
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

}
