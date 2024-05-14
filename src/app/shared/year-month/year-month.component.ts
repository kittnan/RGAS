import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM/YYYY',
  },
  display: {
    dateInput: 'MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-year-month',
  templateUrl: './year-month.component.html',
  styleUrls: ['./year-month.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class YearMonthComponent {
  @Input() min: Moment | null = null
  @Input() max: Moment | null = null

  @Input() title: string = ''
  @Input() dateInput: any = null
  @Input() disabled: boolean = false
  @Output() dateInputChange: EventEmitter<any> = new EventEmitter()
  chosenYearHandler(normalizedYear: Moment) {
    this.dateInput = moment().set('year', normalizedYear.year())
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.dateInput = moment(this.dateInput).set('month', normalizedMonth.month())
    this.dateInputChange.emit(moment(this.dateInput).startOf('month'))
    datepicker.close();
  }

  onClear(){
    this.dateInput = '';
  }
  onSetValue(){
    this.dateInput = null
    this.dateInputChange.emit(null)
  }
  onSetValue2(){
    this.dateInput = ''
  }

}
