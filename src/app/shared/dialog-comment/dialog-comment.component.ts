import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-comment',
  templateUrl: './dialog-comment.component.html',
  styleUrls: ['./dialog-comment.component.scss']
})
export class DialogCommentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<DialogCommentComponent>) { }
  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById('comment')?.focus()
    }, 500);
  }
  onCancel() {
    this.dialog.close(null)
  }
  onSubmit() {
    this.dialog.close(this.data)
  }
}
