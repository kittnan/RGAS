import { Component, Input, OnInit } from '@angular/core';

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
  @Input() form: any
  constructor() { }

  ngOnInit(): void {
  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.id === value.id;
  }

}
