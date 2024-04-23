import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
import { lastValueFrom } from 'rxjs';
import { HttpMailService } from 'src/app/https/http-mail.service';
import { SendMailService } from 'src/app/services/send-mail.service';
@Component({
  selector: 'app-dialog-email',
  templateUrl: './dialog-email.component.html',
  styleUrls: ['./dialog-email.component.scss']
})
export class DialogEmailComponent implements OnInit {

  editor!: Editor;
  email = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = '',
    private dialog: MatDialogRef<DialogEmailComponent>,
    private $mail: HttpMailService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.email = this.data.html
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onClose() {
    this.dialog.close(false)
  }

  async onSubmit() {
    console.log(this.editor);

    this.data.html = this.email
    // console.log("🚀 ~ this.email:", this.email)
    // await lastValueFrom(this.$mail.save({ html: this.email }))
    let info = await lastValueFrom(this.$mail.send(this.data))
    this.dialog.close(true)
  }

}
