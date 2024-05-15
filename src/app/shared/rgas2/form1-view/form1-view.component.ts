import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import moment from 'moment';

@Component({
  selector: 'app-form1-view',
  templateUrl: './form1-view.component.html',
  styleUrls: ['./form1-view.component.scss']
})
export class Form1ViewComponent implements OnInit {

  @Input() form: any
  @Input() form2: any
  @Input() form3: any
  constructor(
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }
  // todo open bottom files
  openBottom() {
    this._bottomSheet.open(FilesBottomComponent, {
      data: {
        files: this.form.files,
        registerNo: this.form.registerNo,
        no: this.form.no,
        form: this.form,
        showDeleteBtn: false,
      },
    })
  }
  // todo control badge number
  controlBadgeNumber(files: any) {
    if (files && files.length < 1) return null
    return files ? files.length : null
  }



  // todo condition show submit final report customer
  submitFinalReportToCustomer() {
    if (this.form3 && this.form3.finalReport.dateSubmitToCustomer) {
      return true
    }
    return false
  }

  // todo condition show submit  final report OBL
  submitFinalReportToOBL() {
    if (this.form3 && this.form3.finalReportOBL.dateSubmitToCustomer) {
      return true
    }
    return false
  }

  // todo css bg1
  moreThan2Month() {
    if (this.form2?.partReceivingDate && this.form3?.finalReport?.dateSubmitToCustomer) {
      const nextMonth = moment(this.form2.partReceivingDate).add(2, 'month')
      const today = moment(this.form3.finalReport.dateSubmitToCustomer)
      if (today > nextMonth) {
        return false
      }
    }
    return true
  }
  // todo css analysis lead time text
  moreThan15Month() {
    if (this.form2?.partReceivingDate && this.form3?.finalReport?.dateSubmitToCustomer) {
      const nextMonth = moment(this.form2.partReceivingDate).add(1.5, 'month')
      const today = moment(this.form3.finalReport.dateSubmitToCustomer)
      if (today > nextMonth) {
        return false
      }
    }
    return true
  }

}
