import { Component, Input, OnInit } from '@angular/core';
import * as QRCode from 'qrcode'

interface FORM2 {
  partReceivingDate: any,
  PIC: any,
  rgaNo: any,
  ktcAnalysisResult: any,
  appearance: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: []
  },
  function: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: []
  },
  electrical: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: []
  },
  disassembly: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: []
  },
  microscope: {
    result: any,
    analysisBy: any,
    selectName: any,
    analysisDate: any,
    files: []
  },
  technical: {
    result: any,
    analysisReportNo: any,
    files: [],
  },
  supplier: {
    result: any,
    files: [],
    farPnnNumber: any,
    issueDate: any,
  },
  ktcJudgment: any,
  qrcode: any
}
@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit {

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
  constructor() { }

  async ngOnInit(): Promise<void> {
    const qr: any = await this.generateQrcode('xxx')
    console.log("🚀 ~ qr:", qr)
    this.form.qrcode = qr
  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.id === value.id;
  }

  // todo submit fn
  onSubmit() {
    console.log(this.form);
  }
  // todo generate qr code
  generateQrcode(text: string): Promise<any> {
    return QRCode.toDataURL(text)
  }

}
