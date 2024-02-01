import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Form3MenuComponent } from './form3-menu/form3-menu.component';

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

  form: any = {
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
  constructor(
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
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

  // todo open bottom sheet
  openBottomSheet(): void {
    this._bottomSheet.open(Form3MenuComponent);
  }


}
