import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { lastValueFrom } from 'rxjs';
import { HttpDCdService } from 'src/app/https/http-d-cd.service';
import { HttpLCdService } from 'src/app/https/http-l-cd.service';
import { HttpM1eService } from 'src/app/https/http-m1e.service';
import { HttpPrincipleService } from 'src/app/https/http-principle.service';
import { HttpSCdService } from 'src/app/https/http-s-cd.service';
import { HttpUsersService } from 'src/app/https/http-users.service';

import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.scss']
})
export class Form3Component implements OnInit {


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

  tempObj = {
    dueDate: null,
    dateSubmitToCustomer: null,
    files: [],
    status: 'engineer'
  }

  @Input() form: any = {
    preReport: { ...this.tempObj },
    interims: [
      { ...this.tempObj, index: 1 }
    ],
    finalReport: { ...this.tempObj },
    finalReportOBL: {
      dueDate: null,
      dateSubmitToCustomer: null,
      PIC: null
    },
    questionAnswers: [
      { ...this.tempObj, index: 1 }
    ],
    ng: null,
  }

  @Input() reportInformation: any = {
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
      value1: null,
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

  // todo PIC Option
  PICOption: any = []

  // todo d-cd option
  dcdOption: any = []
  // todo d-cd column B option
  dcdOption1: any = []
  // todo d-cd column C option
  dcdOption2: any = []
  // todo d-cd column D option
  dcdOption3: any = []

  // todo m1eOption column B option
  m1eOption: any = []
  // todo m1eOption defect detail column C option
  m1eOption1: any = []
  // todo m1eOption defect cause column C option
  m1eOption2: any = []

  // todo principle option
  principleOption: any = []
  principleOption1: any = []
  principleOption2: any = []

  lcdOption: any = []
  lcdOption1: any = []
  lcdOption2: any = []

  scdOption: any = []
  scdOption1: any = []

  @Output() submitReportChange: EventEmitter<any> = new EventEmitter()
  @Output() submitReportArrChange: EventEmitter<any> = new EventEmitter()
  @Output() uploadChange: EventEmitter<any> = new EventEmitter()
  @Output() uploadArrChange: EventEmitter<any> = new EventEmitter()
  @Output() formChange: EventEmitter<any> = new EventEmitter()
  @Output() approveChange: EventEmitter<any> = new EventEmitter()
  @Output() approveArrChange: EventEmitter<any> = new EventEmitter()
  @Output() deleteArrChange: EventEmitter<any> = new EventEmitter()
  @Output() reportInformationChange: EventEmitter<any> = new EventEmitter()

  // ngPhenomenonForm: FormControl = new FormControl()
  // detailForm: FormControl = new FormControl()
  // notAcceptedP: FormControl = new FormControl()


  // todo test
  refreshAutocomplete: boolean = true
  dcdForm1: FormControl = new FormControl('')
  dcdForm2: FormControl = new FormControl('')
  dcdForm3: FormControl = new FormControl('')

  lcdForm1: FormControl = new FormControl('')
  lcdForm2: FormControl = new FormControl('')

  m1eForm1: FormControl = new FormControl('')
  m1eForm2: FormControl = new FormControl('')

  principleForm1: FormControl = new FormControl('')
  principleForm2: FormControl = new FormControl('')

  scdForm1: FormControl = new FormControl('')


  constructor(
    private _bottomSheet: MatBottomSheet,
    private $d_cd: HttpDCdService,
    private $l_cd: HttpLCdService,
    private $s_cd: HttpSCdService,
    private $m1e: HttpM1eService,
    private $principle: HttpPrincipleService,
    private $user: HttpUsersService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      if(this.reportInformation){
        this.dcdForm1.patchValue(this.reportInformation.ng.value1)
        this.m1eForm1.patchValue(this.reportInformation.ng.value2)

        this.dcdForm2.patchValue(this.reportInformation.notAccepted.value1)
        this.m1eForm2.patchValue(this.reportInformation.notAccepted.value2)

        this.dcdForm3.patchValue(this.reportInformation.noAbnormality.value1)
        this.principleForm1.patchValue(this.reportInformation.noAbnormality.value2)

        this.lcdForm1.patchValue(this.reportInformation.withinSpec.value1)
        this.principleForm2.patchValue(this.reportInformation.withinSpec.value2)

        this.lcdForm2.patchValue(this.reportInformation.notRecurred.value1)

        this.scdForm1.patchValue(this.reportInformation.difference.value1)

      }

      const resDcd = await lastValueFrom(this.$d_cd.get(new HttpParams()))
      this.dcdOption = resDcd.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.dcdOption1 = [...new Set(resDcd.map((item: any) => item['Defect Phenomenon']))].filter((item: any) => item)
      this.dcdOption2 = [...new Set(resDcd.map((item: any) => item['Detailed phenomenon']))].filter((item: any) => item)
      this.dcdOption3 = [...new Set(resDcd.map((item: any) => item['Cause']))].filter((item: any) => item)

      const resM1e = await lastValueFrom(this.$m1e.get(new HttpParams()))
      this.m1eOption = resM1e.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.m1eOption1 = [...new Set(resM1e.map((item: any) => item['Details']))]
      this.m1eOption2 = [...new Set(resM1e.map((item: any) => item['Cause']))]

      const resPrinciple = await lastValueFrom(this.$principle.get(new HttpParams()))
      this.principleOption = resPrinciple.map((item: any, i: number) => {
        item.no = 'principle' + i + 1
        return item
      })
      this.principleOption1 = [...new Set(resPrinciple.map((item: any) => item['Outflow cause(Leak cause)']))]
      this.principleOption2 = [...new Set(resPrinciple.map((item: any) => item['Total code']))]

      const resLcd = await lastValueFrom(this.$l_cd.get(new HttpParams()))
      this.lcdOption = resLcd.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.lcdOption1 = [...new Set(resLcd.map((item: any) => item['Occurrence process category']))]
      this.lcdOption2 = [...new Set(resLcd.map((item: any) => item['Occurrence process category details']))]


      const resScd = await lastValueFrom(this.$s_cd.get(new HttpParams()))
      this.scdOption = resScd.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.scdOption1 = [...new Set(resScd.map((item: any) => item['取引先名']))]

      let userParam2 = new HttpParams().set('access', JSON.stringify(['operator']))
      this.PICOption = await lastValueFrom(this.$user.get(userParam2))

      this.onRefreshAutocomplete()

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onAddNewInterim() {
    let items = this.form.interims.sort((a: any, b: any) => a.index - b.index)
    if (items && items.length > 0) {
      const lastItem = items.slice(-1)[0]
      this.form.interims.push({ ...this.tempObj, index: Number(lastItem.index) + 1 })
    } else {
      this.form.interims.push({ ...this.tempObj, index: 1 })
    }
  }
  onAddNewQuestionAnswer() {
    let items = this.form.questionAnswers.sort((a: any, b: any) => a.index - b.index)
    if (items && items.length > 0) {
      const lastItem = items.slice(-1)[0]
      this.form.questionAnswers.push({ ...this.tempObj, index: Number(lastItem.index) + 1 })
    } else {
      this.form.questionAnswers.push({ ...this.tempObj, index: 1 })
    }
  }
  onAddNewRootCauseAction() {
    this.reportInformation.rootCauseActions.push({
      value: null,
      date: null,
      index: this.reportInformation.rootCauseActions.length + 1
    })
  }
  onAddNewLeakCauseAction() {
    this.reportInformation.leakCauseActions.push({
      value: null,
      date: null,
      index: this.reportInformation.leakCauseActions.length + 1
    })
  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    if (option._id && value._id)
      return option._id === value._id;
    return false
  }

  // todo open file bottom
  openBottom(files: any, key: any) {
    this._bottomSheet.open(FilesBottomComponent, {
      data: {
        files: files,
        registerNo: this.form.registerNo,
        no: this.form.no,
        showDeleteBtn: true,
        form: this.form[key],
        type: 'report'
      },
    })
  }

  // todo control badge number
  controlBadgeNumber(files: any) {
    if (!files) return null
    if (files && files.length < 1) return null
    return files.length
  }

  // todo control report one
  async onUploadFile($event: any, key: string) {
    try {
      let file: any = $event.target.files[0] as File;
      this.uploadChange.emit({
        file: file,
        data: this.form[key],
        key: key
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onSubmitReport(key: any) {
    this.submitReportChange.emit({ data: this.form[key], key: key })
  }
  onApproveChange(key: any) {
    this.approveChange.emit({ data: this.form[key], key: key })
  }

  // todo control report arr
  async onUploadFileArr($event: any, key: string, i: number) {
    try {
      let file: any = $event.target.files[0] as File;
      this.uploadArrChange.emit({
        file: file,
        data: this.form[key][i],
        key: key,
        index: i
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onSubmitReportArrChange(key: string, i: number) {
    this.submitReportArrChange.emit({ data: this.form[key][i], key: key, index: i })
  }

  onApproveChangeArr(key: any, i: number) {
    let item = this.form[key][i]
    this.approveArrChange.emit({ data: item, key: key, index: i })
  }

  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name

    }
    return ''
  }

  // todo onClickDeleteArr
  onClickDeleteArr(key: string, i: number) {
    this.deleteArrChange.emit({ key: key, index: i })
  }


  onSaveReportInformation() {
      this.reportInformation.ng.value1 = this.dcdForm1.value
      this.reportInformation.ng.value2 = this.m1eForm1.value

      this.reportInformation.notAccepted.value1 = this.dcdForm2.value
      this.reportInformation.notAccepted.value2 = this.m1eForm2.value

      this.reportInformation.noAbnormality.value1 = this.dcdForm3.value
      this.reportInformation.noAbnormality.value2 = this.principleForm1.value

      this.reportInformation.withinSpec.value1 = this.lcdForm1.value
      this.reportInformation.withinSpec.value2 = this.principleForm2.value

      this.reportInformation.notRecurred.value1 = this.lcdForm2.value

      this.reportInformation.difference.value1 = this.scdForm1.value

      console.log(this.reportInformation);


    this.reportInformationChange.emit(this.reportInformation)
  }

  // todo css tag report status
  cssTagReportStatus(status: string) {
    switch (status) {
      case 'engineer':
        return 'tag-engineer'
      case 'section':
        return 'tag-section'
      case 'interpreter':
        return 'tag-interpreter'
      case 'department':
        return 'tag-department'
      case 'finish':
        return 'tag-finish'
      default:
        return ''
    }
  }

  // todo onChangeAutoComplete
  // onChangeAutoComplete(event: any, key1: string, key2: string) {
  //   // if (key1 && key2) {
  //   //   this.reportInformation[key1][key2] = event
  //   // } else {
  //   //   this.reportInformation[key1] = event
  //   // }
  // }
  onChangeAutoComplete2(event: FormControl, key1: string, key2: string) {
    if (key1 && key2) {
      this.reportInformation[key1][key2] = event.value
    } else {
      this.reportInformation[key1] = event.value
    }
  }

  onChangeDcd1() {
    try {

      if (this.dcdOption1.some((item: any) => item == this.dcdForm1.value)) {
        this.dcdOption2 = this.dcdOption.filter((item: any) => this.dcdForm1.value == item['Defect Phenomenon'])
        this.dcdOption2 = [...new Set(this.dcdOption2.map((item: any) => item['Detailed phenomenon']))].filter((item: any) => item)

        let value1 = this.dcdOption2.find((item: any) => item == this.dcdForm2.value) ? this.dcdForm2.value : ''
        this.dcdForm2.patchValue(value1)


        this.dcdOption3 = this.dcdOption.filter((item: any) => this.dcdForm1.value == item['Defect Phenomenon'])
        this.dcdOption3 = [...new Set(this.dcdOption3.map((item: any) => item['Cause']))].filter((item: any) => item)

        let value2 = this.dcdOption3.find((item: any) => item == this.dcdForm3.value) ? this.dcdForm3.value : ''
        this.dcdForm3.patchValue(value2)

        this.onRefreshAutocomplete()
      }
      if (this.dcdForm1.value.trim() == '' && this.dcdForm2.value.trim() == '' && this.dcdForm3.value.trim() == '') {

        this.dcdOption1 = [...new Set(this.dcdOption.map((item: any) => item['Defect Phenomenon']))].filter((item: any) => item)
        this.dcdOption2 = [...new Set(this.dcdOption.map((item: any) => item['Detailed phenomenon']))].filter((item: any) => item)
        this.dcdOption3 = [...new Set(this.dcdOption.map((item: any) => item['Cause']))].filter((item: any) => item)
        this.onRefreshAutocomplete()

      }



    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onChangeDcd2() {
    try {

      if (this.dcdOption2.some((item: any) => item == this.dcdForm2.value)) {
        this.dcdOption1 = this.dcdOption.filter((item: any) => this.dcdForm2.value == item['Detailed phenomenon'])
        this.dcdOption1 = [...new Set(this.dcdOption1.map((item: any) => item['Defect Phenomenon']))].filter((item: any) => item)

        let value1 = this.dcdOption1.find((item: any) => item == this.dcdForm1.value) ? this.dcdForm1.value : ''
        this.dcdForm1.patchValue(value1)

        this.dcdOption3 = this.dcdOption.filter((item: any) => this.dcdForm2.value == item['Detailed phenomenon'])
        this.dcdOption3 = [...new Set(this.dcdOption3.map((item: any) => item['Cause']))].filter((item: any) => item)

        let value2 = this.dcdOption3.find((item: any) => item == this.dcdForm3.value) ? this.dcdForm3.value : ''
        this.dcdForm3.patchValue(value2)

        this.onRefreshAutocomplete()
      }
      if (this.dcdForm1.value.trim() == '' && this.dcdForm2.value.trim() == '' && this.dcdForm3.value.trim() == '') {

        this.dcdOption1 = [...new Set(this.dcdOption.map((item: any) => item['Defect Phenomenon']))].filter((item: any) => item)
        this.dcdOption2 = [...new Set(this.dcdOption.map((item: any) => item['Detailed phenomenon']))].filter((item: any) => item)
        this.dcdOption3 = [...new Set(this.dcdOption.map((item: any) => item['Cause']))].filter((item: any) => item)
        this.onRefreshAutocomplete()

      }


    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onChangeDcd3() {
    try {

      if (this.dcdOption3.some((item: any) => item == this.dcdForm3.value)) {
        this.dcdOption2 = this.dcdOption.filter((item: any) => this.dcdForm3.value == item['Cause'])
        this.dcdOption2 = [...new Set(this.dcdOption2.map((item: any) => item['Detailed phenomenon']))].filter((item: any) => item)


        let value1 = this.dcdOption2.find((item: any) => item == this.dcdForm2.value) ? this.dcdForm2.value : ''
        this.dcdForm2.patchValue(value1)

        this.dcdOption1 = this.dcdOption.filter((item: any) => this.dcdForm3.value == item['Cause'])
        this.dcdOption1 = [...new Set(this.dcdOption1.map((item: any) => item['Defect Phenomenon']))].filter((item: any) => item)

        let value2 = this.dcdOption1.find((item: any) => item == this.dcdForm1.value) ? this.dcdForm1.value : ''
        this.dcdForm1.patchValue(value2)
        this.onRefreshAutocomplete()
      }


      if (this.dcdForm1.value.trim() == '' && this.dcdForm2.value.trim() == '' && this.dcdForm3.value.trim() == '') {

        this.dcdOption1 = [...new Set(this.dcdOption.map((item: any) => item['Defect Phenomenon']))].filter((item: any) => item)
        this.dcdOption2 = [...new Set(this.dcdOption.map((item: any) => item['Detailed phenomenon']))].filter((item: any) => item)
        this.dcdOption3 = [...new Set(this.dcdOption.map((item: any) => item['Cause']))].filter((item: any) => item)
        this.onRefreshAutocomplete()

      }


    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onChangeLcd1() {
    try {
      if (this.lcdOption1.some((item: any) => item == this.lcdForm1.value)) {

        this.lcdOption2 = this.lcdOption.filter((item: any) => this.lcdForm1.value == item['Occurrence process category'])
        this.lcdOption2 = [...new Set(this.lcdOption2.map((item: any) => item['Occurrence process category details']))].filter((item: any) => item)

        let value1 = this.lcdOption2.find((item: any) => item == this.lcdForm2.value) ? this.lcdForm2.value : ''
        this.lcdForm2.patchValue(value1)
        this.onRefreshAutocomplete()

      }


      if (this.lcdForm1.value.trim() == '' && this.lcdForm2.value.trim() == '') {

        this.lcdOption1 = [...new Set(this.lcdOption.map((item: any) => item['Occurrence process category details']))]
        this.lcdOption2 = [...new Set(this.lcdOption.map((item: any) => item['Occurrence process category']))]
        this.onRefreshAutocomplete()

      }

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onChangeLcd2() {
    try {
      if (this.lcdOption2.some((item: any) => item == this.lcdForm2.value)) {
        this.lcdOption1 = this.lcdOption.filter((item: any) => this.lcdForm2.value == item['Occurrence process category details'])
        this.lcdOption1 = [...new Set(this.lcdOption1.map((item: any) => item['Occurrence process category']))].filter((item: any) => item)


        let value1 = this.lcdOption1.find((item: any) => item == this.lcdForm1.value) ? this.lcdForm1.value : ''
        this.lcdForm1.patchValue(value1)
        this.onRefreshAutocomplete()

      }


      if (this.lcdForm1.value.trim() == '' && this.lcdForm2.value.trim() == '') {

        this.lcdOption1 = [...new Set(this.lcdOption.map((item: any) => item['Occurrence process category details']))]
        this.lcdOption2 = [...new Set(this.lcdOption.map((item: any) => item['Occurrence process category']))]
        this.onRefreshAutocomplete()

      }
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  onChangeM1e1() {
    try {
      if (this.m1eOption1.some((item: any) => item == this.m1eForm1.value)) {

        this.m1eOption2 = this.m1eOption.filter((item: any) => this.m1eForm1.value == item['Details'])
        this.m1eOption2 = [...new Set(this.m1eOption2.map((item: any) => item['Cause']))].filter((item: any) => item)


        let value1 = this.m1eOption2.find((item: any) => item == this.m1eForm2.value) ? this.m1eForm2.value : ''
        this.m1eForm2.patchValue(value1)
        this.onRefreshAutocomplete()
      }

      if (this.m1eForm1.value.trim() == '' && this.m1eForm2.value.trim() == '') {

        this.m1eOption1 = [...new Set(this.m1eOption.map((item: any) => item['Details']))]
        this.m1eOption2 = [...new Set(this.m1eOption.map((item: any) => item['Cause']))]
        this.onRefreshAutocomplete()

      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onChangeM1e2() {
    try {

      if (this.m1eOption2.some((item: any) => item == this.m1eForm2.value)) {

        this.m1eOption1 = this.m1eOption.filter((item: any) => this.m1eForm2.value == item['Cause'])
        this.m1eOption1 = [...new Set(this.m1eOption1.map((item: any) => item['Details']))].filter((item: any) => item)


        let value1 = this.m1eOption1.find((item: any) => item == this.m1eForm1.value) ? this.m1eForm1.value : ''
        this.m1eForm1.patchValue(value1)
        this.onRefreshAutocomplete()
      }

      if (this.m1eForm1.value.trim() == '' && this.m1eForm2.value.trim() == '') {
        this.m1eOption1 = [...new Set(this.m1eOption.map((item: any) => item['Details']))]
        this.m1eOption2 = [...new Set(this.m1eOption.map((item: any) => item['Cause']))]
        this.onRefreshAutocomplete()

      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onChangePrinciple1() {
    try {

      if (this.principleOption1.some((item: any) => item == this.principleForm1.value)) {

        this.principleOption2 = this.principleOption.filter((item: any) => this.principleForm1.value == item['Outflow cause(Leak cause)'])
        this.principleOption2 = [...new Set(this.principleOption2.map((item: any) => item['Total code']))].filter((item: any) => item)


        let value1 = this.principleOption2.find((item: any) => item == this.principleForm2.value) ? this.principleForm2.value : ''
        this.principleForm2.patchValue(value1)
        this.onRefreshAutocomplete()
      }

      if (this.principleForm1.value.trim() == '' && this.principleForm2.value.trim() == '') {
        this.principleOption1 = [...new Set(this.principleOption.map((item: any) => item['Outflow cause(Leak cause)']))]
        this.principleOption2 = [...new Set(this.principleOption.map((item: any) => item['Total code']))]
        this.onRefreshAutocomplete()

      }

    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  onChangePrinciple2() {
    try {

      if (this.principleOption2.some((item: any) => item == this.principleForm2.value)) {

        this.principleOption1 = this.principleOption.filter((item: any) => this.principleForm2.value == item['Total code'])
        this.principleOption1 = [...new Set(this.principleOption1.map((item: any) => item['Outflow cause(Leak cause)']))].filter((item: any) => item)


        let value1 = this.principleOption1.find((item: any) => item == this.principleForm1.value) ? this.principleForm1.value : ''
        this.principleForm1.patchValue(value1)
        this.onRefreshAutocomplete()
      }

      if (this.principleForm1.value.trim() == '' && this.principleForm2.value.trim() == '') {
        this.principleOption1 = [...new Set(this.principleOption.map((item: any) => item['Outflow cause(Leak cause)']))]
        this.principleOption2 = [...new Set(this.principleOption.map((item: any) => item['Total code']))]
        this.onRefreshAutocomplete()

      }

    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }
  onRefreshAutocomplete() {
    this.refreshAutocomplete = false
    setTimeout(() => {
      this.refreshAutocomplete = true
    }, 50);
  }

}
