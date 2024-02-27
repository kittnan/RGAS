import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';

@Component({
  selector: 'app-form2-view',
  templateUrl: './form2-view.component.html',
  styleUrls: ['./form2-view.component.scss']
})
export class Form2ViewComponent implements OnInit {
  @Input() form2: any
  constructor(
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }
  // todo control checkbox
  controlCheckbox($event: any) {
    $event.target.checked = false
  }
  // todo label show PIC
  labelShowPIC() {
    if (this.form2.PIC) {
      let PIC = this.form2.PIC
      return `${PIC.firstName}-${PIC.lastName[0]}`
    }
    return ''
  }
  // todo open file bottom
  openBottom(files: any) {
    this._bottomSheet.open(FilesBottomComponent, {
      data: files
    })
  }

  // todo control badge number
  controlBadgeNumber(files: any) {
    if (files && files.length < 1) return null
    return files.length
  }
  // todo show user login name
  displayName(user: any) {
    if (user) {
      let firstName = user.firstName ? user.firstName : ''
      let lastName = user.lastName ? user.lastName[0] : ''
      return `${firstName}-${lastName}`
    }
    return ''
  }

}
