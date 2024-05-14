import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker-custom',
  templateUrl: './date-picker-custom.component.html',
  styleUrls: ['./date-picker-custom.component.scss']
})
export class DatePickerCustomComponent implements OnInit {

  @Input() title: any = ''
  @Input() date: any
  @Output() dateChange: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onSetValue(){
    this.date = null
    this.emit()
  }
  onSetValue2(){
    this.date = ''
    this.emit()
  }
  emit() {
    this.dateChange.emit(this.date)
  }

}
