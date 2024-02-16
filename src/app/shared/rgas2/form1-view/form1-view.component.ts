import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';

@Component({
  selector: 'app-form1-view',
  templateUrl: './form1-view.component.html',
  styleUrls: ['./form1-view.component.scss']
})
export class Form1ViewComponent implements OnInit {

  @Input() form: any
  constructor(
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }
  // todo open bottom files
  openBottom() {
    this._bottomSheet.open(FilesBottomComponent, {
      data: this.form.files
    })
  }
  // todo control badge number
  controlBadgeNumber(files: any) {
    if (files && files.length < 1) return null
    return files ? files.length : null
  }

}
