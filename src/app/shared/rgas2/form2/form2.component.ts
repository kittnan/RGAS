import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import * as QRCode from 'qrcode'
import { lastValueFrom } from 'rxjs';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { environment } from 'src/environments/environment';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import { HttpResultService } from 'src/app/https/http-result.service';

interface FORM2 {
  [key: string]: any,
  partReceivingDate: any,
  PIC: any,
  rgaNo: any,
  ktcAnalysisResult: any,
  appearance: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: any
  },
  function: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: any
  },
  electrical: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: any
  },
  disassembly: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: any
  },
  microscope: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: any
  },
  technical: {
    result: any,
    analysisReportNo: any,
    files: any,
  },
  supplier: {
    result: any,
    files: any,
    farPnnNumber: any,
    issueDate: any,
  },
  ktcJudgment: any,
  qrcode: any,
  _id?: any,
}
@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit {
  pathFile = environment.pathSaveFile
  runNumber = '2024-01-0001'
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
  option1: string[] = [
    'OK',
    'NG'
  ]
  option2: string[] = [
    'OK',
    'NG',
    'NONE'
  ]
  option3: string[] = [
    'OK',
    'NG',
    'Not Accept'
  ]

  PICOption: string[] = [
    'Mr.Songkarn',
    'Mr.Yuttana',
    'Mr.Pongdanai',
  ]


  @Input() form: FORM2 = {
    partReceivingDate: null,
    PIC: null,
    rgaNo: null,
    ktcAnalysisResult: null,
    appearance: {
      result: null,
      analysisBy: null,
      selectName: null,
      analysisDate: null,
      files: []
    },
    function: {
      result: null,
      analysisBy: null,
      selectName: null,
      analysisDate: null,
      files: []
    },
    electrical: {
      result: null,
      analysisBy: null,
      selectName: null,
      analysisDate: null,
      files: []
    },
    disassembly: {
      result: null,
      analysisBy: null,
      selectName: null,
      analysisDate: null,
      files: []
    },
    microscope: {
      result: null,
      analysisBy: null,
      selectName: null,
      analysisDate: null,
      files: []
    },
    technical: {
      result: null,
      analysisReportNo: null,
      files: [],
    },
    supplier: {
      result: null,
      files: [],
      farPnnNumber: null,
      issueDate: null,
    },
    ktcJudgment: null,
    qrcode: null
  }
  // @Input() form:any
  @Input() claim: any

  @ViewChild('appearanceFile', { static: true }) appearanceFile!: ElementRef;
  @ViewChild('functionFile', { static: true }) functionFile!: ElementRef;
  @ViewChild('electricalFile', { static: true }) electricalFile!: ElementRef;
  @ViewChild('disassemblyFile', { static: true }) disassemblyFile!: ElementRef;
  @ViewChild('microscopeFile', { static: true }) microscopeFile!: ElementRef;
  @ViewChild('technicalFile', { static: true }) technicalFile!: ElementRef;
  @ViewChild('supplierFile', { static: true }) supplierFile!: ElementRef;

  // todo analysis PIC option
  analysisPICOption: any[] = []

  constructor(
    private $fileUpload: HttpFileUploadService,
    private $user: HttpUsersService,
    private _bottomSheet: MatBottomSheet,
    private $result: HttpResultService
  ) { }

  async ngOnInit(): Promise<void> {
    let userParam = new HttpParams().set('access', JSON.stringify(['engineer']))
    this.analysisPICOption = await lastValueFrom(this.$user.get(userParam))
    let params2: HttpParams = new HttpParams()
    params2 = params2.set('registerNo', JSON.stringify([this.claim['registerNo']]))
    let resResult = await lastValueFrom(this.$result.get(params2))
    if (resResult && resResult.length > 0) {
      this.form = resResult[0]
      console.log("🚀 ~ this.form:", this.form)
    } else {
      const qr: any = await this.generateQrcode('xxx')
      this.form.qrcode = qr
    }

  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    if (option._id && value._id) {
      return option._id === value._id;
    }
    return false
  }

  // todo submit fn
  async onSubmit() {
    try {
      console.log(this.form);
      console.log(this.claim);
      const newResult = {
        ...this.form,
        registerNo: this.claim.registerNo
      }
      const res = await lastValueFrom(this.$result.createOrUpdate([newResult]))
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  // todo generate qr code
  generateQrcode(text: string): Promise<any> {
    return QRCode.toDataURL(text)
  }

  // todo upload appearance file
  async onUploadFile($event: any, key: string) {
    try {
      let file: any = $event.target.files[0] as File;
      if (file) {
        const formData: FormData = new FormData()
        formData.append('path', `${this.pathFile}/${this.runNumber}/`)
        formData.append('file', file)
        const resFile = await lastValueFrom(this.$fileUpload.create(formData))
        const newFile = {
          ...resFile[0],
          index: 1,
          date: new Date(),
        }
        if (this.form[key].files && this.form[key].files.some((item: any) => item.filename == newFile.filename)) {
          const index = this.form[key].files.findIndex((item: any) => item.filename == newFile.filename)
          this.form[key].files[index] = newFile
        } else {
          this.form[key].files = !this.form[key].files ? [newFile] : [...this.form[key].files, {
            ...resFile[0],
            index: this.form[key].files.length + 1,
            date: new Date(),
          }]
        }
        console.log(this.form);
        this.onSubmit()
        this.clearInputFile()
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo clear input file
  clearInputFile() {
    this.appearanceFile.nativeElement.value = ''
    this.functionFile.nativeElement.value = ''
    this.electricalFile.nativeElement.value = ''
    this.disassemblyFile.nativeElement.value = ''
    this.microscopeFile.nativeElement.value = ''
    this.technicalFile.nativeElement.value = ''
    this.supplierFile.nativeElement.value = ''
  }

  // todo control checkbox
  controlCheckbox($event: any) {
    $event.target.checked = false
  }

  // todo label show PIC
  labelShowPIC() {
    if (this.form.PIC) {
      let PIC = this.form.PIC
      return `${PIC.firstName}-${PIC.lastName[0]}`
    }
    return ''
  }

  // todo open file bottom
  openBottom(files: any) {
    this._bottomSheet.open(FilesBottomComponent, {
      data: files
    })
  }

  // todo control badge number
  controlBadgeNumber(files: any) {
    if (files && files.length < 1) return null
    return files.length
  }
}
