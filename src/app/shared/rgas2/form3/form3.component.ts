import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import { HttpDCdService } from 'src/app/https/http-d-cd.service';
import { HttpLCdService } from 'src/app/https/http-l-cd.service';
import { HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

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
    status: ''

  }

  @Input() form: any = {
    preReport: { ...this.tempObj },
    interims: [
      { ...this.tempObj, index: 1 }
    ],
    finalReport: { ...this.tempObj },
    finalReportOBL: { ...this.tempObj },
    questionAnswers: [
      { ...this.tempObj, index: 1 }
    ],
    ng: null,
    rootCauseActions: [
      {
        value: null,
        date: null,
        index: 1
      }
    ],
    leakCauseActions: [
      {
        value: null,
        date: null,
        index: 1
      }
    ],
  }

  // todo d-cd option
  dcdOption: any = []
  // todo d-cd column B option
  defectPhenomenonOption: any = []

  constructor(
    private _bottomSheet: MatBottomSheet,
    private $d_cd: HttpDCdService,
    private $l_cd: HttpLCdService,
    private $s_cd: HttpLCdService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const resDcd = await lastValueFrom(this.$d_cd.get(new HttpParams()))
      this.dcdOption = resDcd.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.defectPhenomenonOption = [...new Set(resDcd.map((item: any) => item['Defect Phenomenon']))]
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onAddNewInterim() {
    this.form.interims.push({ ...this.tempObj, index: this.form.interims.length + 1 })
  }
  onAddNewQuestionAnswer() {
    this.form.questionAnswers.push({ ...this.tempObj, index: this.form.questionAnswers.length + 1 })
  }
  onAddNewRootCauseAction() {
    this.form.rootCauseActions.push({
      value: null,
      date: null,
      index: this.form.rootCauseActions.length + 1
    })
  }
  onAddNewLeakCauseAction() {
    this.form.leakCauseActions.push({
      value: null,
      date: null,
      index: this.form.leakCauseActions.length + 1
    })
  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.id === value.id;
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

  // todo upload file
  async onUploadFile($event: any, key: string) {
    try {

      let file: any = $event.target.files[0] as File;
      console.log("🚀 ~ file:", file)

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }



}
