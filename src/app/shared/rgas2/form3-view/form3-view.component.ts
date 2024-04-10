import { Component, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';

@Component({
  selector: 'app-form3-view',
  templateUrl: './form3-view.component.html',
  styleUrls: ['./form3-view.component.scss']
})
export class Form3ViewComponent implements OnInit {

  @Input() form: any
  @Input() reportInformation: any
  constructor(
    private _bottomSheet: MatBottomSheet,

  ) { }

  ngOnInit(): void {

  }

  // todo css tag report status
  cssTagReportStatus(status: string) {
    switch (status) {
      case 'engineer':
        return 'tag-engineer'
      case 'section':
        return 'tag-section'
      case 'interpreter':
        return 'tag-interpreter'
      case 'department':
        return 'tag-department'
      case 'finish':
        return 'tag-finish'
      default:
        return ''
    }
  }
  // todo control badge number
  controlBadgeNumber(files: any) {
    if (!files) return null
    if (files && files.length < 1) return null
    return files.length
  }

  // todo open file bottom
  openBottom(files: any, key: any) {
    this._bottomSheet.open(FilesBottomComponent, {
      data: {
        files: files,
        registerNo: this.form.registerNo,
        no: this.form.no,
        showDeleteBtn: false,
        form: this.form[key],
        type: 'report',
      },
    })
  }
}
