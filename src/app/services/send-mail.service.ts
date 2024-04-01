import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpMailService } from '../https/http-mail.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(
    private $loader: NgxUiLoaderService,
    private $mail: HttpMailService
  ) { }

  async approve(data: any, comment: any, to: any[]) {
    this.$loader.start()
    let html = `<p><strong>Dear...All</strong></p>

       <p>&nbsp;</p>

       <p><strong>We&#39;d like to share claim information from $type $occurredLocation $qty&nbsp;</strong></p>

       <p><strong>Please see the detail below and attached file</strong><br />
       &nbsp;</p>

       <p><strong><span style="color:#7FFFD4">${comment}</span></strong></p>

       <p><strong>Model&nbsp; : </strong>$modelCode</p>

       <p><strong>Q&#39;ty </strong>: $qty</p>

       <p><strong>Lot :</strong>&nbsp;$productLotNo</p>

       <p><strong>Serial :</strong>&nbsp;$serial</p>

       <p><strong>Failure phenomenon :</strong>&nbsp; $failure</p>

       <p><strong>Occurrence place :</strong>&nbsp;$occur</p>

       <p><strong>Driving kilometer :</strong>&nbsp;$text</p>

       <p>&nbsp;</p>

       <p><strong>Attached, you will find the necessary documentation for further investigation. Please review it promptly and take appropriate actions to address this matter.</strong></p>

       <p>Click here ➡️ $link</p>

       <p>&nbsp;</p>

       <p><strong><span style="color:#c0392b">Please note that this email is automatically generated. Kindly refrain from replying directly to it.</span></strong></p>

       <p><strong><span style="color:#c0392b">Thank you for your attention to this urgent matter.</span></strong></p>

       <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>
       `
    const info = await lastValueFrom(this.$mail.send({
      to: to,
      html: html,
      data:data
    }))
    this.$loader.stop()
    return info
  }
  async reject(data: any, comment: any, to: any[]) {
    this.$loader.start()
    let html = `<p><strong>Dear...All</strong></p>

       <p>&nbsp;</p>

       <p><strong>We&#39;d like to share claim information from $type $occurredLocation $qty&nbsp;</strong></p>

       <p><strong>Please see the detail below and attached file</strong><br />
       &nbsp;</p>

       <p><strong><span style="color:#7FFFD4">${comment}</span></strong></p>

       <p><strong>Model&nbsp; : </strong>$modelCode</p>

       <p><strong>Q&#39;ty </strong>: $qty</p>

       <p><strong>Lot :</strong>&nbsp;$productLotNo</p>

       <p><strong>Serial :</strong>&nbsp;$serial</p>

       <p><strong>Failure phenomenon :</strong>&nbsp; $failure</p>

       <p><strong>Occurrence place :</strong>&nbsp;$occur</p>

       <p><strong>Driving kilometer :</strong>&nbsp;$text</p>

       <p>&nbsp;</p>

       <p><strong>Attached, you will find the necessary documentation for further investigation. Please review it promptly and take appropriate actions to address this matter.</strong></p>

       <p>Click here ➡️ $link</p>

       <p>&nbsp;</p>

       <p><strong><span style="color:#c0392b">Please note that this email is automatically generated. Kindly refrain from replying directly to it.</span></strong></p>

       <p><strong><span style="color:#c0392b">Thank you for your attention to this urgent matter.</span></strong></p>

       <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>
       `
    const info = await lastValueFrom(this.$mail.send({
      to: to,
      html: html
    }))
    this.$loader.stop()
    return info
  }
}
