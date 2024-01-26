import { Component, OnInit } from '@angular/core';

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
  }
  constructor() { }

  ngOnInit(): void {
  }

  onAddNewInterim() {
    this.form.interims.push({ ...this.tempObj, index: this.form.interims.length + 1 })
  }
  onAddNewQuestionAnswer() {
    this.form.questionAnswers.push({ ...this.tempObj, index: this.form.interims.length + 1 })
  }
  onAddNewRootCauseAction() {
    this.form.rootCauseActions.push({
      value: null,
      date: null,
      index: this.form.interims.length + 1
    })
  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.id === value.id;
  }


}
