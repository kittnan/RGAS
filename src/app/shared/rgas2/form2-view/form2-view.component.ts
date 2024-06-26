import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import { GeneratePdfService } from 'src/app/services/generate-pdf.service';

@Component({
  selector: 'app-form2-view',
  templateUrl: './form2-view.component.html',
  styleUrls: ['./form2-view.component.scss']
})
export class Form2ViewComponent implements OnInit {
  @Input() form1: any
  @Input() form2: any
  constructor(
    private _bottomSheet: MatBottomSheet,
    private $pdf: GeneratePdfService
  ) { }

  ngOnInit(): void {
  }
  // todo control checkbox
  controlCheckbox($event: any) {
    $event.target.checked = false
  }
  // todo label show PIC
  labelShowPIC() {
    if (this.form2?.PIC) {
      let PIC = this.form2.PIC
      return PIC.name
    }
    return ''
  }
  // todo open file bottom
  openBottom(files: any) {
    console.log("🚀 ~ files:", files)
    this._bottomSheet.open(FilesBottomComponent, {
      data: {
        files: files,
        showDeleteBtn: false,
      },

    })
  }

  // todo control badge number
  controlBadgeNumber(files: any) {
    if (files && files.length < 1) return null
    if (!files) return null
    return files.length
  }
  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name
    }
    return ''
  }


  // todo printLabel
  printLabel() {
    try {
      this.$pdf.generatePDF(`${this.form1.claimNo}-${this.form1.registerNo}`)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}
