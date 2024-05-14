import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.scss']
})
export class Form4Component implements OnInit {

  @Input() form4: any
  @Output() form4Change: EventEmitter<any> = new EventEmitter()
  @Output() autoSaveDocChange: EventEmitter<any> = new EventEmitter()

  options1: any = ['Need', 'No Need']
  constructor() { }

  ngOnInit(): void {
  }

  onChangeRevise() {
    if (this.form4.revise && this.form4.revise == 'Need') {
      this.form4.reviseDueDate = moment().add(2, 'month')
    } else {
      this.form4.reviseDueDate = null
    }
  }

  emitAutoSaveDoc() {
    console.log(this.form4);
    this.autoSaveDocChange.emit(this.form4)
  }

  onSave() {
    this.form4Change.emit(this.form4)
  }
}
