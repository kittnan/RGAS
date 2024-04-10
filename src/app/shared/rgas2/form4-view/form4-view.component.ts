import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form4-view',
  templateUrl: './form4-view.component.html',
  styleUrls: ['./form4-view.component.scss']
})
export class Form4ViewComponent implements OnInit {

  @Input() form4:any
  constructor() { }

  ngOnInit(): void {

  }

}
