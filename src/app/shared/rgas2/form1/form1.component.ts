import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
import { HttpMastersService } from 'src/app/https/http-masters.service';
import { HttpModelsService } from 'src/app/https/http-models.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertResult } from 'sweetalert2';

import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import { DialogCommentComponent } from '../../dialog-comment/dialog-comment.component';
import { HttpModelsCommonService } from 'src/app/https/http-models-common.service';
import { DialogEmailComponent } from '../../dialog-email/dialog-email.component';
import { SendMailService } from 'src/app/services/send-mail.service';

export interface FORM1 {
  [key: string]: any,
  claimNo: any,
  modelNo: any,
  modelNoPNL?: any,
  modelNoSMT?: any,
  productNo: any,
  customerNo: any,
  modelCode: any,
  analysisPIC: any,
  customerName: any,
  type: any,
  descriptionJP: any,
  saleCompany: any,
  sideNo: any,
  descriptionENG: any,
  salePIC: any,
  qty: any,
  functionAppearance: any,
  returnStyle: any,
  productLotNo: any,
  AWBNo: any,
  modelClassification: any,
  productionMonth: any,
  InvNo: any,
  calendarYear: any,
  commercialDistribution: any,
  dateReceiveInv: any,
  claimRegisterDate: any,
  useAppearance: any,
  transportationCost: any,
  unit: any,
  receiveInfoDate: any,
  occurredLocation: any,
  costMonth: any,
  dueDate: any,
  importance: any,
  files: any,
  status: any,
  index?: any,
  no?: any,
  registerNo?: any,
  flowPIC?: any,
  flowHistory?: any
  _id?: any,
  productCost: any,
  productCostUnit: any,
  size: any,
  serialLotNo: any,
}

export interface FlowHistory {
  [key: string]: any,
  user: any,
  action: any,
  date: any,
}


@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  providers: []
})
export class Form1Component implements OnInit {
  // todo path file server
  pathFile = environment.pathSaveFile
  @Input() form: FORM1 = {
    claimNo: null,
    modelNo: null,
    productNo: null,
    customerNo: null,
    modelCode: null,
    analysisPIC: null,
    customerName: null,
    type: null,
    descriptionJP: null,
    saleCompany: null,
    sideNo: null,
    descriptionENG: null,
    salePIC: null,
    qty: null,
    functionAppearance: null,
    returnStyle: null,
    productLotNo: null,
    AWBNo: null,
    modelClassification: null,
    productionMonth: null,
    InvNo: null,
    calendarYear: null,
    commercialDistribution: null,
    dateReceiveInv: null,
    claimRegisterDate: null,
    useAppearance: null,
    transportationCost: null,
    unit: null,
    receiveInfoDate: null,
    occurredLocation: null,
    costMonth: null,
    dueDate: null,
    importance: null,
    files: [],
    status: null,
    flowPIC: null,
    flowHistory: [],
    productCost: null,
    productCostUnit: null,
    size: '',
    serialLotNo: ''
  }
  @Input() form2: any = null
  @Input() form3: any = null
  @Input() saveStatus: boolean = false


  // todo form output event
  @Output() formChange: EventEmitter<any> = new EventEmitter()
  @Output() maxChange: EventEmitter<any> = new EventEmitter()
  @Output() submitChange: EventEmitter<any> = new EventEmitter()
  @Output() copyChange: EventEmitter<any> = new EventEmitter()
  @Output() deleteChange: EventEmitter<any> = new EventEmitter()
  @Output() saveStatusChange: EventEmitter<any> = new EventEmitter()
  // todo auto save event
  @Output() onAutoSaveChange: EventEmitter<any> = new EventEmitter()
  // todo temp option
  tempOption: any[] = [
    {
      value: '1',
      viewValue: '11111'
    },
    {
      value: '2',
      viewValue: '22222'
    },
  ]

  // todo model option
  modelOption: any[] = []
  modelOptionString: string[] = []

  // todo customer option
  customerOptionString: string[] = []

  // todo type option
  typeOptionString: string[] = []

  // todo function option
  functionAppearanceOptionString: string[] = ['Function', 'Appearance']

  // todo return style option
  returningStyleOption: any = []

  // todo model classification option
  modelClassificationOption: any = []

  // todo model commercial option
  commercialDistributionOption: any = []

  // todo model use appearance option
  useAppearancelicationOption: any = []

  // todo model currency option
  currencyOption: any = []

  // todo model occur option
  occurredLocationOption: any = []

  // todo claim rank option
  claimRankOptionString: string[] = ['S >= 3 pcs', 'A = 2 pcs', 'B = 1 pc']

  // todo analysis PIC option
  analysisPICOption: any[] = []

  // todo next PIC option
  userApproveClaimOption: any[] = []


  // // todo form model code
  // modelCodeForm: FormControl = new FormControl()

  // // todo form model code
  // sendToForm: FormControl = new FormControl()

  // todo user login
  userLogin: any

  // todo send to
  sendTo: any



  // modelOptionString!: Observable<string[]>

  // modelCodeCtrl: FormControl<string> = this.claimInfoCtrl.get('modelCode') as FormControl<string>;


  // todo element files control
  @ViewChild('fileUploadOBL', { static: true }) fileUploadOBL!: ElementRef;
  @ViewChild('informationFile', { static: true }) informationFile!: ElementRef;


  showModelCode: boolean = true


  constructor(
    public dialog: MatDialog,
    private $model: HttpModelsService,
    private $master: HttpMastersService,
    private $fileUpload: HttpFileUploadService,
    private $user: HttpUsersService,
    private _bottomSheet: MatBottomSheet,
    private $claim: HttpClaimService,
    private $local: LocalStoreService,
    private $alert: SweetAlertGeneralService,
    private $modelCommon: HttpModelsCommonService,
    private sendMail: SendMailService
  ) {
    this.userLogin = this.$local.getProfile()
  }

  async ngOnInit(): Promise<void> {
    this.modelOption = await lastValueFrom(this.$model.get(new HttpParams()))
    // this.modelOptionString = new Observable<string[]>((observer) => {
    //   const data: string[] = this.modelOption.map((item: any) => item['Model'].toString())
    //   observer.next(data)
    //   observer.complete()
    // })
    this.modelOptionString = this.modelOption.map((item: any) => item['Model Name']).filter((item: any) => item)
    let customerOptionString: string[] = this.modelOption.map((item: any) => item['Customer'] ? item['Customer'] : '').filter((item: any) => item)
    this.customerOptionString = [...new Set(customerOptionString.map(item => item))];
    let typeOptionString: string[] = this.modelOption.map((item: any) => item['Classification'] ? item['Classification'] : '').filter((item: any) => item)
    this.typeOptionString = [...new Set(typeOptionString.map(item => item))];

    this.returningStyleOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['returningStyle'])).set('status', JSON.stringify(['active']))))

    this.modelClassificationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['modelClassification'])).set('status', JSON.stringify(['active']))))

    this.commercialDistributionOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['commercialDistribution'])).set('status', JSON.stringify(['active']))))

    this.useAppearancelicationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['useAppearancelication'])).set('status', JSON.stringify(['active']))))

    this.currencyOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['currency'])).set('status', JSON.stringify(['active']))))

    this.occurredLocationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['occurredLocation'])).set('status', JSON.stringify(['active']))))

    if (this.form.status) {
      this.userApproveClaimOption = await lastValueFrom(this.$user.userNextApprove(new HttpParams().set('formStatus', JSON.stringify(this.form.status))))
    }

    let userParam = new HttpParams().set('access', JSON.stringify(['engineer', 'sectionHead', 'departmentHead']))
    this.analysisPICOption = await lastValueFrom(this.$user.get(userParam))

    if (this.form && this.form.registerNo) {
      this.setDefaultValue()
    }

  }

  // todo set default value
  setDefaultValue() {
    // this.form.calendarYear = moment(this.form.calendarYear)

    // this.modelCodeForm.patchValue(this.form.modelCode)
  }


  // todo upload OBL
  async onUploadFile($event: any) {
    this.showModelCode = false
    let file: any = $event.target.files[0] as File;
    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.load(file);

      const worksheet: ExcelJS.Worksheet | undefined = workbook.getWorksheet(1);

      if (worksheet) {
        let modelCode = this.getValueOfCell('W8', worksheet)
        let model: any = modelCode ? this.modelOption.find((item: any) => item['Model Name'] == modelCode) : ''
        let dueDate = this.getValueOfCell('AV21', worksheet)
        dueDate = dueDate ? moment(dueDate) : null
        let occurDate = this.getValueOfCell('R17', worksheet)
        occurDate = occurDate ? moment(occurDate) : null


        let modelCommon = model ? await lastValueFrom(this.$modelCommon.get(new HttpParams().set('modelNo', model['Model']))) : null
        modelCommon = modelCommon && modelCommon.length > 0 ? modelCommon[0] : null

        let occurredLocation = this.getValueOfCell('R15', worksheet)

        this.form = {
          ...this.form,
          claimNo: this.getValueOfCell('J2', worksheet),
          customerNo: this.getValueOfCell('AQ14', worksheet),
          customerName: this.getValueOfCell('W10', worksheet),
          saleCompany: this.getValueOfCell('W12', worksheet),
          salePIC: this.getValueOfCell('BC7', worksheet),
          dueDate: dueDate,

          modelCode: modelCode ? modelCode : null,
          modelNo: model ? model['Model'] : null,
          qty: this.getValueOfCell('AV17', worksheet),
          productLotNo: this.getValueOfCell('M26', worksheet),
          occurredLocation: occurredLocation,

          descriptionJP: this.getValueOfCell('J32', worksheet),
          descriptionENG: this.getValueOfCell('J37', worksheet),

          occurDate: occurDate,

          modelNoPNL: modelCommon ? modelCommon['Model(PNL)'] : '',
          modelNoSMT: modelCommon ? modelCommon['Model(SMT)'] : '',
          size: modelCommon ? modelCommon.Size : ''
        }
        setTimeout(() => {
          this.showModelCode = true
        }, 300);
        // this.modelCodeForm.patchValue(modelCode)
        // this.maxChange.emit(this.form.qty)
        this.fileUploadOBL.nativeElement.value = ''
      }
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  }


  // todo upload claim information file
  async onUploadFileClaimInformation($event: any) {
    try {
      let file: any = $event.target.files[0] as File;
      if (file) {
        const formData: FormData = new FormData()
        formData.append('path', `${this.pathFile}/${this.form.registerNo}/`)
        formData.append('file', file)
        const resFile = await lastValueFrom(this.$fileUpload.create(formData))
        const newFile = {
          ...resFile[0],
          index: 1,
          date: new Date(),
        }
        if (this.form.files && this.form.files.some((item: any) => item.filename == newFile.filename)) {
          const index = this.form.files.findIndex((item: any) => item.filename == newFile.filename)
          this.form.files[index] = newFile
          this.onSave()
        } else {
          this.form.files = !this.form.files ? [newFile] : [...this.form.files, {
            ...resFile[0],
            index: this.form.files.length + 1,
            date: new Date(),
          }]
          this.onSave()
        }
        this.informationFile.nativeElement.value = ''
      }

    } catch (error) {
    }
  }
  // todo excel fn
  getValueOfCell(address: string, ws: ExcelJS.Worksheet) {
    let value: any = ws.getCell(address).value
    value = value?.result ? value.result : value
    return value
  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    if (option._id && value._id) {
      return option._id === value._id;
    }
    return false
  }

  // async onMonthChange(key: string) {
  //   const month = await this.monthSelect()
  //   this.form[key] = month
  // }

  // monthSelect() {
  //   return new Promise(resolve => {
  //     this.dialog.open(MonthSelectComponent).afterClosed().subscribe((res: any) => {
  //       if (res) {
  //         resolve(moment(`2020-${res}-01`).format('MMMM'))
  //       } else {
  //         resolve(null)
  //       }
  //     })
  //   })
  // }
  onChangeModelCode($event: any) {
    let value: any = $event
    const founded: any = this.modelOption.find((item: any) => item['Model Name'] == value)
    this.form['modelCode'] = value
    if (founded) {
      this.form['modelNo'] = founded['Model'].toString()
    } else {
      this.form['modelNo'] = ''
    }

  }
  emitYear(e: any, key: string) {
    this.form[key] = e
  }

  // todo on on save
  onSave() {
    let now: FlowHistory = {
      action: 'receive information',
      date: new Date(),
      user: this.userLogin,
    }
    this.form.flowHistory = [now]
    this.form.flowPIC = this.userLogin
    this.form.status = 'receive information'
    this.formChange.emit(this.form)
  }
  // todo on finish
  onSubmit() {
    Swal.fire({
      title: 'Submit?',
      icon: 'question',
      showCancelButton: true
    }).then(async (v: SweetAlertResult) => {
      if (v.isConfirmed) {


        let foo = this.sendMail.toApproveClaim(this.form, this.sendTo)

        let dialogEmail = this.dialog.open(DialogEmailComponent, {
          data: foo
        })

        dialogEmail.afterClosed().subscribe((data: any) => {
          if (data === true) {
            this.form.flowPIC = this.sendTo
            this.form.status = 'wait approve'
            let obj: FlowHistory = {
              action: 'request',
              date: new Date(),
              user: this.userLogin,
              comment: ''
            }
            this.form.flowHistory.push(obj)
            this.submitChange.emit(this.form)
          }
        })

        // let dialog = this.dialog.open(DialogCommentComponent, {
        //   disableClose: true,
        //   data: ''
        // })
        // dialog.afterClosed().subscribe(async (comment: any) => {
        //   console.log("🚀 ~ comment:", comment)
        //   if (comment !== false) {
        //     this.form.flowPIC = this.sendTo
        //     this.form.status = 'wait approve'
        //     let obj: FlowHistory = {
        //       action: 'request',
        //       date: new Date(),
        //       user: this.userLogin,
        //       comment: ''
        //     }
        //     this.form.flowHistory.push(obj)

        //     let foo = this.sendMail.generateRequestEngineerApproveEmail(this.form, comment, this.sendTo)

        //     let dialogEmail = this.dialog.open(DialogEmailComponent, {
        //       data: foo
        //     })

        //     dialogEmail.afterClosed().subscribe((infoEmail: any) => {
        //       this.submitChange.emit(this.form)
        //     })

        //   }



        // })
      }
    })

  }

  // todo open bottom files
  openBottom() {
    this._bottomSheet.open(FilesBottomComponent, {
      data: {
        files: this.form.files,
        registerNo: this.form.registerNo,
        no: this.form.no,
        showDeleteBtn: true,
        form: this.form,
        type: 'claim'
      },
    })
  }

  // todo copy
  onCopy() {
    try {
      Swal.fire({
        title: 'Copy?',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          this.onSave()
          let newForm = {
            ...this.form,
            files: [],
          }
          const res = await lastValueFrom(this.$claim.createSub(newForm))
          this.copyChange.emit(res)
        }
      })

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo delete
  onDelete() {
    Swal.fire({
      title: 'Delete?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.delete()
      }
    })
  }
  async delete() {
    try {
      let params: HttpParams = new HttpParams()
      params = params.set('_id', this.form._id)
      let res = await lastValueFrom(this.$claim.delete(params))
      this.$alert.success()
      this.deleteChange.emit(this.form._id)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }


  // todo control badge number
  controlBadgeNumber(files: any) {
    if (files && files.length < 1) return null
    return files ? files.length : null
  }

  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name
    }
    return ''
  }

  // // todo emitSaveStatus
  // emitSaveStatus() {
  //   this.saveStatusChange.emit(true)
  // }

  // todo condition show submit final report customer
  submitFinalReportToCustomer() {
    if (this.form3 && this.form3.finalReport.dateSubmitToCustomer) {
      return true
    }
    // if (this.form3 && this.form3.finalReport.files && this.form3.finalReport.files.length > 0) {
    //   return true
    // }
    return false
  }

  // todo condition show submit  final report OBL
  submitFinalReportToOBL() {
    if (this.form3 && this.form3.finalReportOBL.dateSubmitToCustomer) {
      return true
    }
    return false
  }

  // todo css bg1
  moreThan2Month() {
    if (this.form2 && this.form2.partReceivingDate && this.form3 && this.form3.finalReport && this.form3.finalReport.dateSubmitToCustomer) {
      const nextMonth = moment(this.form2.partReceivingDate).add(2, 'month')
      const today = moment(this.form3.finalReport.dateSubmitToCustomer)
      if (today > nextMonth) {
        return false
      }
    }
    return true
  }
  // todo css analysis lead time text
  moreThan15Month() {
    if (this.form2 && this.form2.partReceivingDate && this.form3 && this.form3.finalReport.dateSubmitToCustomer) {
      const nextMonth = moment(this.form2.partReceivingDate).add(1.5, 'month')
      const today = moment(this.form3.finalReport.dateSubmitToCustomer)
      if (today > nextMonth) {
        return false
      }
    }
    return true
  }

  // // todo check PIC
  // disableEditByPIC() {
  //   // if (this.form && this.form.flowPIC) {
  //   //   let PIC = this.form.flowPIC
  //   //   if (this.userLogin._id == PIC) return false
  //   // }
  //   // return true
  //   return false
  // }

  // todo auto save
  emitAutoSave() {
    if (this.form._id) {
      this.onAutoSaveChange.emit(this.form)
    }

    // let now: FlowHistory = {
    //   action: 'receive information',
    //   date: new Date(),
    //   user: this.userLogin,
    // }
    // this.form.flowHistory = [now]
    // this.form.flowPIC = this.userLogin
    // this.form.status = 'receive information'
    // this.formChange.emit(this.form)
  }


}
