import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-form3-menu',
  templateUrl: './form3-menu.component.html',
  styleUrls: ['./form3-menu.component.scss']
})
export class Form3MenuComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>) { }
  ngOnInit(): void {

  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
