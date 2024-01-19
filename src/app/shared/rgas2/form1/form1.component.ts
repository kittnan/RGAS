import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {

  tempOption:any[]= [
    {
      value: '1',
      viewValue:'11111'
    },
    {
      value: '2',
      viewValue:'22222'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
