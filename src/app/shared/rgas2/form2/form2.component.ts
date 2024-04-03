import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import * as QRCode from 'qrcode'
import { lastValueFrom } from 'rxjs';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { environment } from 'src/environments/environment';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import { HttpResultService } from 'src/app/https/http-result.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { FORM1 } from '../form1/form1.component';
import { GeneratePdfService } from 'src/app/services/generate-pdf.service';

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
  qrcode?: any,
  _id?: any,
  claimId?: any,
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
    '',
    'OK',
    'NG',
    'Not Accept'
  ]

  PICOption: any[] = [
    'Mr.Songkarn',
    'Mr.Yuttana',
    'Mr.Pongdanai',
  ]


  @Input() form2!: FORM2
  // @Input() form:any
  @Input() claim!: FORM1

  @ViewChild('appearanceFile', { static: true }) appearanceFile!: ElementRef;
  @ViewChild('functionFile', { static: true }) functionFile!: ElementRef;
  @ViewChild('electricalFile', { static: true }) electricalFile!: ElementRef;
  @ViewChild('disassemblyFile', { static: true }) disassemblyFile!: ElementRef;
  @ViewChild('microscopeFile', { static: true }) microscopeFile!: ElementRef;
  @ViewChild('technicalFile', { static: true }) technicalFile!: ElementRef;
  @ViewChild('supplierFile', { static: true }) supplierFile!: ElementRef;

  // // todo analysis PIC option
  // analysisPICOption: any[] = []

  // todo on save
  @Output() onSaveChange: EventEmitter<any> = new EventEmitter()
  // todo create event
  @Output() onCreateChange: EventEmitter<any> = new EventEmitter()
  // todo upload event
  @Output() onUploadChange: EventEmitter<any> = new EventEmitter()

  constructor(
    private $fileUpload: HttpFileUploadService,
    private $user: HttpUsersService,
    private _bottomSheet: MatBottomSheet,
    private $result: HttpResultService,
    private $pdf: GeneratePdfService
  ) { }

  async ngOnInit(): Promise<void> {


    // let userParam = new HttpParams().set('access', JSON.stringify(['engineer']))
    // this.analysisPICOption = await lastValueFrom(this.$user.get(userParam))
    let userParam2 = new HttpParams().set('access', JSON.stringify(['operator']))
    this.PICOption = await lastValueFrom(this.$user.get(userParam2))
    if (!this.form2) {
      this.form2 = {
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
        qrcode: ''
      }
    }
    let qrcodeValue = `${this.claim.claimNo},${this.claim.modelCode},${this.claim.modelNo},${this.claim.productLotNo}`
    const qr: any = await this.generateQrcode(qrcodeValue)
    if (this.form2 && qr) {
      this.form2.qrcode = qr
    }


  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    if (option._id && value._id) {
      return option._id === value._id;
    }
    return false
  }


  // todo generate qr code
  generateQrcode(text: string): Promise<any> {
    return QRCode.toDataURL(text)
  }

  // todo upload file
  async onUploadFile($event: any, key: string) {
    try {
      let file: any = $event.target.files[0] as File;
      if (file) {
        this.onUploadChange.emit({
          file: file,
          data: this.form2,
          key
        })
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
    if (this.form2.PIC) {
      let PIC = this.form2.PIC
      return PIC.name
    }
    return ''
  }

  // todo open file bottom
  openBottom(files: any, key?: any) {
    this._bottomSheet.open(FilesBottomComponent, {
      data: {
        files: files,
        form: this.form2,
        showDeleteBtn: true,
        type: 'result',
        key: key
      },
    })
  }

  // todo control badge number
  controlBadgeNumber(files: any) {
    if (files && files.length < 1) return null
    return files.length
  }

  // todo on save
  onSave() {
    Swal.fire({
      title: "Save?",
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.save()
      }
    })
  }
  async save() {
    try {
      if (this.form2._id) {
        this.form2.claimId = this.claim._id
        this.onSaveChange.emit({ data: this.form2 })
      } else {
        this.onCreateChange.emit({ data: this.form2 })
      }

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo printLabel
  printLabel() {
    try {
      this.$pdf.generatePDF(`${this.claim.claimNo}-${this.claim.registerNo}`)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name
    }
    return ''
  }

  // todo disablePrintBtn
  disablePrintBtn() {
    if (this.claim.claimNo && this.form2.rgaNo && this.claim.customerName && this.claim.productNo && this.claim.modelNo && this.claim.productLotNo && this.claim.descriptionENG && this.form2.PIC) return false
    return true
  }
}
