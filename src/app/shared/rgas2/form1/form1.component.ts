import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/https/http-masters.service';
import { HttpModelsService } from 'src/app/https/http-models.service';

import { MonthSelectComponent } from '../../dialogs/month-select/month-select.component';
import { FormControl } from '@angular/forms';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
import { environment } from 'src/environments/environment';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { LocalStoreService } from 'src/app/services/local-store.service';

export interface FORM1 {
  [key: string]: any,
  claimNo: any,
  modelNo: any,
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
  _id?: any
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

  }


  // todo form output event
  @Output() formChange: EventEmitter<any> = new EventEmitter()
  @Output() maxChange: EventEmitter<any> = new EventEmitter()
  @Output() submitChange: EventEmitter<any> = new EventEmitter()
  @Output() copyChange: EventEmitter<any> = new EventEmitter()
  @Output() deleteChange: EventEmitter<any> = new EventEmitter()

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


  // todo form model code
  modelCodeForm: FormControl = new FormControl()

  // todo form model code
  sendToForm: FormControl = new FormControl()

  // todo user login
  userLogin: any

  // todo send to
  sendTo: any


  // modelOptionString!: Observable<string[]>

  // modelCodeCtrl: FormControl<string> = this.claimInfoCtrl.get('modelCode') as FormControl<string>;


  // todo element files control
  @ViewChild('fileUploadOBL', { static: true }) fileUploadOBL!: ElementRef;
  @ViewChild('informationFile', { static: true }) informationFile!: ElementRef;


  constructor(
    public dialog: MatDialog,
    private $model: HttpModelsService,
    private $master: HttpMastersService,
    private $fileUpload: HttpFileUploadService,
    private $user: HttpUsersService,
    private _bottomSheet: MatBottomSheet,
    private $claim: HttpClaimService,
    private $local: LocalStoreService
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

    this.returningStyleOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['returningStyle']))))

    this.modelClassificationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['modelClassification']))))

    this.commercialDistributionOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['commercialDistribution']))))

    this.useAppearancelicationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['useAppearancelication']))))

    this.currencyOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['currency']))))

    this.occurredLocationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['occurredLocation']))))

    if (this.form.status) {
      this.userApproveClaimOption = await lastValueFrom(this.$user.userNextApprove(new HttpParams().set('formStatus', JSON.stringify(this.form.status))))
    }

    let userParam = new HttpParams().set('access', JSON.stringify(['engineer']))
    this.analysisPICOption = await lastValueFrom(this.$user.get(userParam))

    if (this.form && this.form.registerNo) {
      this.setDefaultValue()
    }
  }

  // todo set default value
  setDefaultValue() {
    this.modelCodeForm.patchValue(this.form.modelCode)
  }


  // todo upload OBL
  async onUploadFile($event: any) {
    let file: any = $event.target.files[0] as File;
    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.load(file);

      const worksheet: ExcelJS.Worksheet | undefined = workbook.getWorksheet(1);

      if (worksheet) {
        let modelCode = this.getValueOfCell('W8', worksheet)
        let model: any = this.modelOption.find((item: any) => item['Model Name'] == modelCode)
        let dueDate = this.getValueOfCell('R17', worksheet)
        dueDate = dueDate ? moment(dueDate) : null
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
          occurredLocation: this.getValueOfCell('R15', worksheet),

          descriptionJP: this.getValueOfCell('J32', worksheet),
          descriptionENG: this.getValueOfCell('J37', worksheet),


        }
        this.modelCodeForm.patchValue(modelCode)
        // this.maxChange.emit(this.form.qty)
        this.fileUploadOBL.nativeElement.value = ''
      }
      console.log('Excel file successfully read.');
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

  async onMonthChange(key: string) {
    const month = await this.monthSelect()
    this.form[key] = month
  }

  monthSelect() {
    return new Promise(resolve => {
      this.dialog.open(MonthSelectComponent).afterClosed().subscribe((res: any) => {
        if (res) {
          resolve(moment(`2020-${res}-01`).format('MMMM'))
        } else {
          resolve(null)
        }
      })
    })
  }
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
      action: 'draft',
      date: new Date(),
      user: this.userLogin
    }
    this.form.flowHistory = [now]
    this.form.flowPIC = this.userLogin
    this.form.status = 'draft'
    this.formChange.emit(this.form)
  }
  // todo on finish
  onSubmit() {
    Swal.fire({
      title: 'Do you want to Submit?',
      icon: 'question',
      showCancelButton: true
    }).then(async (v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.form.flowPIC = this.sendTo
        this.form.status = 'wait approve'
        let obj: FlowHistory = {
          action: 'request',
          date: new Date(),
          user: this.userLogin
        }

        this.form.flowHistory.push(obj)
        this.submitChange.emit(this.form)
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
        form: this.form
      },
    })
  }

  // todo copy
  onCopy() {
    try {
      Swal.fire({
        title: 'Do you want to copy?',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
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
      title: 'Do you want to delete current?',
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
      console.log("🚀 ~ res:", res)
      Swal.fire({
        title: 'SUCCESS',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.deleteChange.emit(this.form._id)
      })
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

  // // todo check PIC
  // disableEditByPIC() {
  //   // if (this.form && this.form.flowPIC) {
  //   //   let PIC = this.form.flowPIC
  //   //   if (this.userLogin._id == PIC) return false
  //   // }
  //   // return true
  //   return false
  // }


}
