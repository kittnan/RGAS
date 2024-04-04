import { HttpMailService } from 'src/app/https/http-mail.service';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  private text = `<p><strong>Dear...All concern</strong></p>

  <p>&nbsp;</p>

  <p><strong><span style="color:#7FFFD4">$comment</span></strong></p>

  <p><strong>Please review and approve.</strong></p>

  <p>&nbsp;</p>

  <p><strong>Attached, you will find the necessary documentation for further investigation. Please review it promptly and take appropriate actions to address this matter.</strong></p>

  <p>Click here ➡️ $link</p>

  <p>&nbsp;</p>

  <p><strong><span style="color:#c0392b">Please note that this email is automatically generated. Kindly refrain from replying directly to it.</span></strong></p>

  <p><strong><span style="color:#c0392b">Thank you for your attention to this urgent matter.</span></strong></p>

  <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>`

  private text2 = `<p><strong>Dear...All</strong></p>

  <p>&nbsp;</p>

  <p><strong>We&#39;d like to share claim information from $type $occurredLocation $qty&nbsp;</strong></p>

  <p><strong>Please see the detail below and attached file</strong><br />
  &nbsp;</p>

  <p><strong><span style="color:#7FFFD4">$comment</span></strong></p>

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

  <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>`


  private footerEmail = `
  <p></p>
  <p><strong><span style="color:#c0392b">Please note that this email is automatically generated. Kindly refrain from replying directly to it.</span></strong></p>

  <p><strong><span style="color:#c0392b">Thank you for your attention to this urgent matter.</span></strong></p>

  <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>`
  private symbol = [
    {
      sym: '●',
      value: 'In process claim'
    },
    {
      sym: '▲',
      value: 'Field claim'
    },
    {
      sym: '■',
      value: '0 km claim'
    },
    {
      sym: '☐',
      value: 'NG from arrival inspection'
    },
  ]

  dearAllEmail: any
  private linkMail = environment.linkMail;
  constructor(
    private $mail: HttpMailService,
    private $local: LocalStoreService
  ) {
    this.$mail.getDearAll().subscribe((data: any) => {
      this.dearAllEmail = data.map((d: any) => d.email)
    })
  }

  toApproveClaim(data: any, to: any[]) {
    let url = `${this.linkMail}/${this.$local.getAuth()}/approve-claim?registerNo=${data.registerNo}&no=${data.no}`

    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    let symbol = this.symbol.find((sy: any) => sy.value.includes(data.occurredLocation))

    let qtyTxt = Number(data.qty) > 1 ? 'pcs' : 'pc'
    let subject: any = `📦[REPORT] ${symbol?.sym}${data.customerName} ${data.occurredLocation} ${data.size} #${data.modelNo} ${data.descriptionENG} ${data.qty} ${qtyTxt} ${data.claimNo}. `

    let html: any = `<p><strong>Dear...${dear}</strong></p>

    <p>Could you please review claim information</p>
    <p>Click here ➡️ <a href="${url}">RGAS</a></p>`
    html = html + this.footerEmail
    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }
  toClaimInformation(data: any, to: any[]) {

    console.log(this.dearAllEmail);

    let symbol = this.getSymbol(data.occurredLocation)

    let qtyTxt = Number(data.qty) > 1 ? 'pcs' : 'pc'
    let subject: any = `${symbol}${data.customerName} ${data.occurredLocation} ${data.size} #${data.modelNo} ${data.descriptionENG} ${data.qty} ${qtyTxt} ${data.claimNo}.`

    let html: any = `<p><strong>Dear all,</strong></p>
    <p><strong>Thank you for your support.</strong></p>

    <p>We would like to inform and share claim information from customer ${data.type} occurred ${data.occurredLocation}.
    Please see details below.</p>
    <p></p>


    <p><strong>Claim No. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:</strong>&nbsp;${data.claimNo}</p>
<p><strong>Defective mode. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:</strong>&nbsp;${data.descriptionENG}</p>
<p><strong>Q'ty. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:</strong>&nbsp;${data.qty} ${qtyTxt}</p>
<p><strong>Lot no. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;&nbsp;:</strong>&nbsp;${data.productLotNo}</p>
<p><strong>Occurrence place &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:</strong>&nbsp;${data.occurredLocation}</p>
<p><strong>Occurrence date &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:</strong>&nbsp;${moment(data.occurDate).format('D-MMM-YYYY')}</p>
<p></p>
<p><strong>Model Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;:</strong>&nbsp;${data.modelCode}</p>
<p><strong>MDL model &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;:</strong>&nbsp;${data.modelNo}</p>
<p><strong>PNL model &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;:</strong>&nbsp;${data.modelNoPNL}</p>
<p><strong>SMT model &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;:</strong>&nbsp;${data.modelNoSMT}</p>
    <p></p>
    <p>Dear Orawan san</p>
    <p>CC PD-MDL members</p>
    <p>Would you please verify 4M change of this claim with above information?
    Please reply to us within 28-Mar-24 as possible (Before/After 5 lots)</p>`
    html = html + this.footerEmail
    return {
      html: html,
      subject: subject,
      to: this.dearAllEmail,
      // to: to.map((t: any) => t.email),
      cc: []
    }
  }

  toOperator(claim: any, data: any, to: any[]) {
    let url = `${this.linkMail}/${this.$local.getAuth()}/analysis?registerNo=${claim.registerNo}&no=${claim.no}`

    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    let symbol = this.getSymbol(data.occurredLocation)
    let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`

    let reportText: any = this.getNameReport(data.name)
    let html: any = `<p><strong>Dear ${dear},</strong></p>
        <p><strong>Thank you for your support.</strong></p>

        <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
        Please see details below.</p>
        <p></p>
        <p>Could you please review claim information ${reportText} as attached?</p>
        <p>Click here ➡️ <a href="${url}">RGAS</a></p>
        `
    html = html + this.footerEmail

    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }

  toInterpreter(claim: any, data: any, to: any[]) {
    let url = `${this.linkMail}/${this.$local.getAuth()}/analysis?registerNo=${claim.registerNo}&no=${claim.no}`
    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    let symbol = this.getSymbol(data.occurredLocation)
    let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`

    let reportText: any = this.getNameReport(data.name)

    let html: any = `<p><strong>Dear ${dear},</strong></p>
        <p><strong>Thank you for your support.</strong></p>

        <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
        Please see details below.</p>
        <p></p>
        <p>Could you please translate ${reportText} as attached?</p>
        <p><strong>Remark :</strong></p>
        <p>Due date submit to Customer is 1-Apr-2024</p>
        <p>Due date submit to Customer is 2-Apr-2024</p>
        <p>Click here ➡️ <a href="${url}">RGAS</a></p>
        `
    html = html + this.footerEmail

    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }

  toDepartment(claim: any, data: any, to: any[]) {
    let url = `${this.linkMail}/${this.$local.getAuth()}/analysis?registerNo=${claim.registerNo}&no=${claim.no}`

    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    let symbol = this.getSymbol(data.occurredLocation)
    let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`

    let reportText: any = this.getNameReport(data.name)

    let html: any = `<p><strong>Dear ${dear},</strong></p>
        <p><strong>Thank you for your support.</strong></p>

        <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
        Please see details below.</p>
        <p></p>
        <p>Could you please review ${reportText} as attached?</p>
        <p><strong>Remark :</strong></p>
        <p>Due date submit to Customer is 2-Apr-2024</p>
        <p>Click here ➡️ <a href="${url}">RGAS</a></p>`
    html = html + this.footerEmail

    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }
  toSection(claim: any, data: any, to: any[]) {

    let url = `${this.linkMail}/${this.$local.getAuth()}/analysis?registerNo=${claim.registerNo}&no=${claim.no}`
    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    let symbol = this.getSymbol(data.occurredLocation)
    let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`

    let reportText: any = this.getNameReport(data.name)

    let html: any = `<p><strong>Dear ${dear},</strong></p>
        <p><strong>Thank you for your support.</strong></p>

        <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
        Please see details below.</p>
        <p></p>
        <p>Could you please review ${reportText} as attached?</p>
        <p><strong>Remark :</strong></p>
        <p>1. Due date submit to Kubota san is 1-Apr-2024</p>
        <p>2. Due date submit to Customer is 2-Apr-2024</p>
        <p>Click here ➡️ <a href="${url}">RGAS</a></p>
        `
    html = html + this.footerEmail

    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }
  toEngineer(claim: any, data: any, to: any[]) {
    let url = `${this.linkMail}/${this.$local.getAuth()}/analysis?registerNo=${claim.registerNo}&no=${claim.no}`

    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    let symbol = this.getSymbol(data.occurredLocation)
    let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`

    let reportText: any = this.getNameReport(data.name)

    let html: any = `<p><strong>Dear ${dear},</strong></p>
        <p><strong>Thank you for your support.</strong></p>

        <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
        Please see details below.</p>
        <p></p>
        <p>Could you please review ${reportText} as attached?</p>
        <p><strong>Remark :</strong></p>
        <p>1. Due date submit to Kubota san is 1-Apr-2024</p>
        <p>2. Due date submit to Customer is 2-Apr-2024</p>
        <p>Click here ➡️ <a href="${url}">RGAS</a></p>
        `
    html = html + this.footerEmail

    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }
  // toFinish(claim: any, data: any, to: any[]) {
  //   let dear = to.map((t: any) => {
  //     return `${t.name} san `
  //   })
  //   let symbol = this.symbol.find((sy: any) => sy.value.includes(claim.occurredLocation))
  //   let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
  //   let subject: any = `📦[REPORT] ${symbol?.sym}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt}.`

  //   let reportText: any = this.getNameReport(data.name)

  //   let html: any = `<p><strong>Dear ${dear},</strong></p>
  //       <p><strong>Thank you for your support.</strong></p>

  //       <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
  //       Please see details below.</p>
  //       <p></p>
  //       <p>Could you please review ${reportText} as attached?</p>
  //       <p><strong>Remark :</strong></p>
  //       <p>1. Due date submit to Kubota san is 1-Apr-2024</p>
  //       <p>2. Due date submit to Customer is 2-Apr-2024</p>
  //       `
  //   return {
  //     html: html,
  //     subject: subject,
  //     to: to.map((t: any) => t.email),
  //     cc: []
  //   }
  // }

  private getSymbol(value: any) {
    let option = this.symbol.find((sym: any) => sym == sym.value == value)
    if (option) {
      return option.sym
    }
    return '☐'
  }

  private getNameReport(name: any) {
    if (name == 'preReport') {
      return 'Pre report'
    }
    if (name == 'interims') {
      return 'Interim report'
    }
    if (name == 'finalReport') {
      return 'Final report'
    }
    return ''
  }

  // private genLink(status: any, registerNo: any, no: any) {
  //   let t1 = ''
  //   let t2 = ''
  //   if (status == 'wait approve') {
  //     t1 = 'engineer'
  //     // engineer/approve-claim?registerNo=2024040003&no=1
  //   }

  //   return `http://10.200.90.152:8081/rgas/${t1}/${t2}`
  // }

  // async approve(data: any, comment: any, to: any[]) {
  //   this.$loader.start()
  //   let html = `<p><strong>Dear...All</strong></p>

  //      <p>&nbsp;</p>

  //      <p><strong>We&#39;d like to share claim information from $type $occurredLocation $qty&nbsp;</strong></p>

  //      <p><strong>Please see the detail below and attached file</strong><br />
  //      &nbsp;</p>

  //      <p><strong><span style="color:#7FFFD4">${comment}</span></strong></p>

  //      <p><strong>Model&nbsp; : </strong>$modelCode</p>

  //      <p><strong>Q&#39;ty </strong>: $qty</p>

  //      <p><strong>Lot :</strong>&nbsp;$productLotNo</p>

  //      <p><strong>Serial :</strong>&nbsp;$serial</p>

  //      <p><strong>Failure phenomenon :</strong>&nbsp; $failure</p>

  //      <p><strong>Occurrence place :</strong>&nbsp;$occur</p>

  //      <p><strong>Driving kilometer :</strong>&nbsp;$text</p>

  //      <p>&nbsp;</p>

  //      <p><strong>Attached, you will find the necessary documentation for further investigation. Please review it promptly and take appropriate actions to address this matter.</strong></p>

  //      <p>Click here ➡️ $link</p>

  //      <p>&nbsp;</p>

  //      <p><strong><span style="color:#c0392b">Please note that this email is automatically generated. Kindly refrain from replying directly to it.</span></strong></p>

  //      <p><strong><span style="color:#c0392b">Thank you for your attention to this urgent matter.</span></strong></p>

  //      <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>
  //      `
  //   const info = await lastValueFrom(this.$mail.send({
  //     to: to,
  //     html: html,
  //     data: data
  //   }))
  //   this.$loader.stop()
  //   return info
  // }
  // async reject(data: any, comment: any, to: any[]) {
  //   this.$loader.start()
  //   let html = `<p><strong>Dear...All</strong></p>

  //      <p>&nbsp;</p>

  //      <p><strong>We&#39;d like to share claim information from $type $occurredLocation $qty&nbsp;</strong></p>

  //      <p><strong>Please see the detail below and attached file</strong><br />
  //      &nbsp;</p>

  //      <p><strong><span style="color:#7FFFD4">${comment}</span></strong></p>

  //      <p><strong>Model&nbsp; : </strong>$modelCode</p>

  //      <p><strong>Q&#39;ty </strong>: $qty</p>

  //      <p><strong>Lot :</strong>&nbsp;$productLotNo</p>

  //      <p><strong>Serial :</strong>&nbsp;$serial</p>

  //      <p><strong>Failure phenomenon :</strong>&nbsp; $failure</p>

  //      <p><strong>Occurrence place :</strong>&nbsp;$occur</p>

  //      <p><strong>Driving kilometer :</strong>&nbsp;$text</p>

  //      <p>&nbsp;</p>

  //      <p><strong>Attached, you will find the necessary documentation for further investigation. Please review it promptly and take appropriate actions to address this matter.</strong></p>

  //      <p>Click here ➡️ $link</p>

  //      <p>&nbsp;</p>

  //      <p><strong><span style="color:#c0392b">Please note that this email is automatically generated. Kindly refrain from replying directly to it.</span></strong></p>

  //      <p><strong><span style="color:#c0392b">Thank you for your attention to this urgent matter.</span></strong></p>

  //      <p><strong><span style="color:#c0392b">Best Regards,</span></strong></p>
  //      `
  //   const info = await lastValueFrom(this.$mail.send({
  //     to: to,
  //     html: html
  //   }))
  //   this.$loader.stop()
  //   return info
  // }


}
