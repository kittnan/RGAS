import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-files-bottom',
  templateUrl: './files-bottom.component.html',
  styleUrls: ['./files-bottom.component.scss']
})
export class FilesBottomComponent implements OnInit {

  @Input() files: any[] = []
  filesLen: number = 0
  @Input() showAlway: boolean = false
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  onDownload(item: any) {
  console.log("🚀 ~ item:", item)

  }
  onDelete(item: any) {

  }
}
