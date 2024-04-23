import { HttpMailService } from 'src/app/https/http-mail.service';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from './local-store.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

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
  htmlClaimInformation: any = ''
  htmlApproveClaim: any = ''
  htmlReview1: any = ''
  htmlInterpreter: any = ''
  htmlDepartment: any = ''
  htmlSection: any = ''
  constructor(
    private $mail: HttpMailService,
    private $local: LocalStoreService
  ) {
    this.$mail.getDearAll().subscribe((data: any) => {
      this.dearAllEmail = data.map((d: any) => d.email)
    })

    this.$mail.getTemplate(new HttpParams().set('name', 'claimInformation')).subscribe((data: any) => {
      this.htmlClaimInformation = data[0].html
    })
    this.$mail.getTemplate(new HttpParams().set('name', 'approveClaim')).subscribe((data: any) => {
      this.htmlApproveClaim = data[0].html
    })
    this.$mail.getTemplate(new HttpParams().set('name', 'review1')).subscribe((data: any) => {
      this.htmlReview1 = data[0].html
    })
    this.$mail.getTemplate(new HttpParams().set('name', 'department')).subscribe((data: any) => {
      this.htmlDepartment = data[0].html
    })
    this.$mail.getTemplate(new HttpParams().set('name', 'section')).subscribe((data: any) => {
      this.htmlSection = data[0].html
    })
    this.$mail.getTemplate(new HttpParams().set('name', 'interpreter')).subscribe((data: any) => {
      this.htmlInterpreter = data[0].html
    })
  }

  toApproveClaim(data: any, to: any[]) {
    let url = `${this.linkMail}/${this.$local.getAuth()}/approve-claim?registerNo=${data.registerNo}&no=${data.no}`

    let dear = to.map((t: any) => {
      return `${t.name} san `
    })

    let subject: any = this.genSubject(data)
    let html: any = this.htmlApproveClaim
    html = html.replaceAll('$dear', dear)
    html = html.replaceAll('$link', url)

    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }
  toClaimInformation(data: any, to: any[]) {
    let subject: any = this.genSubjectInformation(data)
    let html: any = this.htmlClaimInformation
    let qtyTxt = Number(data.qty) > 1 ? 'pcs' : 'pc'
    let type = data?.type ? data.type : '-'
    let occurredLocation = data?.occurredLocation ? data.occurredLocation : ''
    let claimNo = data?.claimNo ? data.claimNo : ''
    let descriptionENG = data?.descriptionENG ? data.descriptionENG : ''
    let qty = data?.qty ? data.qty : ''
    let productLotNo = data?.productLotNo ? data.productLotNo : ''
    let occurDate = data?.occurDate ? moment(data.occurDate).format('D-MMM-YYYY') : ''
    let modelCode = data?.modelCode ? data.modelCode : ''
    let modelNo = data?.modelNo ? data.modelNo : ''
    let modelNoPNL = data?.modelNoPNL ? data.modelNoPNL : ''
    let modelNoSMT = data?.modelNoSMT ? data.modelNoSMT : ''
    let url = `${this.linkMail}/${this.$local.getAuth()}/analysis?registerNo=${data.registerNo}&no=${data.no}`
    html = html.replaceAll('$type', type)
    html = html.replaceAll('$occurredLocation', occurredLocation)
    html = html.replaceAll('$claimNo', claimNo)
    html = html.replaceAll('$descriptionENG', descriptionENG)
    html = html.replaceAll('$qtyTxt', qtyTxt)
    html = html.replaceAll('$qty', qty)
    html = html.replaceAll('$productLotNo', productLotNo)
    html = html.replaceAll('$occurDate', occurDate)
    html = html.replaceAll('$modelCode', modelCode)
    html = html.replaceAll('$modelNo', modelNo)
    html = html.replaceAll('$modelNoPNL', modelNoPNL)
    html = html.replaceAll('$modelNoSMT', modelNoSMT)
    html = html.replaceAll('$link', url)


    return {
      html: html,
      subject: subject,
      // to: ['kittinan-k@kyocera.co.th'],
      to: this.dearAllEmail,
      // to: to.map((t: any) => t.email),
      cc: []
    }
  }

  toOperator(claim: any, data: any, to: any[]) {
    let url = `${this.linkMail}/operator/analysis?registerNo=${claim.registerNo}&no=${claim.no}`

    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    // let symbol = this.getSymbol(data.occurredLocation)
    let subject: any = this.genSubject(claim)
    let type = claim?.type ? claim.type : '-'
    let occurredLocation = claim?.occurredLocation ? claim.occurredLocation : ''

    // let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    // let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`

    let reportText: any = this.getNameReport(data.name)
    // let html: any = `<p><strong>Dear ${dear},</strong></p>
    //     <p><strong>Thank you for your support.</strong></p>

    //     <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
    //     Please see details below.</p>
    //     <p></p>
    //     <p>Could you please review claim information ${reportText} as attached?</p>
    //     <p>Click here ➡️ <a href="${url}">RGAS</a></p>
    //     `
    let html: any = this.htmlReview1
    html = html.replaceAll('$dear', dear)
    html = html.replaceAll('$link', url)
    html = html.replaceAll('$type', type)
    html = html.replaceAll('$occurredLocation', occurredLocation)
    html = html.replaceAll('$reportText', reportText)
    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }

  toInterpreter(claim: any, data: any, to: any[]) {
    let url = `${this.linkMail}/interpreter/analysis?registerNo=${claim.registerNo}&no=${claim.no}`
    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    // let symbol = this.getSymbol(data.occurredLocation)
    // let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    // let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`
    let subject: any = this.genSubject(claim)

    let reportText: any = this.getNameReport(data.name)
    let type = claim?.type ? claim.type : '-'
    let occurredLocation = claim?.occurredLocation ? claim.occurredLocation : ''

    // let html: any = `<p><strong>Dear ${dear},</strong></p>
    //     <p><strong>Thank you for your support.</strong></p>

    //     <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
    //     Please see details below.</p>
    //     <p></p>
    //     <p>Could you please translate ${reportText} as attached?</p>
    //     <p><strong>Remark :</strong></p>
    //     <p>Due date submit to Customer is 1-Apr-2024</p>
    //     <p>Due date submit to Customer is 2-Apr-2024</p>
    //     <p>Click here ➡️ <a href="${url}">RGAS</a></p>
    //     `
    let html: any = this.htmlInterpreter
    html = html.replaceAll('$dear', dear)
    html = html.replaceAll('$link', url)
    html = html.replaceAll('$type', type)
    html = html.replaceAll('$occurredLocation', occurredLocation)
    html = html.replaceAll('$reportText', reportText)
    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }

  toDepartment(claim: any, data: any, to: any[]) {
    let url = `${this.linkMail}/departmentHead/analysis?registerNo=${claim.registerNo}&no=${claim.no}`

    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    // let symbol = this.getSymbol(data.occurredLocation)
    // let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    // let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`

    let subject: any = this.genSubject(claim)
    let reportText: any = this.getNameReport(data.name)
    let type = claim?.type ? claim.type : '-'
    let occurredLocation = claim?.occurredLocation ? claim.occurredLocation : ''
    let html: any = this.htmlDepartment
    html = html.replaceAll('$dear', dear)
    html = html.replaceAll('$link', url)
    html = html.replaceAll('$type', type)
    html = html.replaceAll('$occurredLocation', occurredLocation)
    html = html.replaceAll('$reportText', reportText)

    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }
  toSection(claim: any, data: any, to: any[]) {

    let url = `${this.linkMail}/sectionHead/analysis?registerNo=${claim.registerNo}&no=${claim.no}`
    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    // let symbol = this.getSymbol(data.occurredLocation)
    // let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    // let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`

    // let html2: any = `<p><strong>Dear ${dear},</strong></p>
    //     <p><strong>Thank you for your support.</strong></p>

    //     <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
    //     Please see details below.</p>
    //     <p></p>
    //     <p>Could you please review ${reportText} as attached?</p>
    //     <p><strong>Remark :</strong></p>
    //     <p>1. Due date submit to Kubota san is 1-Apr-2024</p>
    //     <p>2. Due date submit to Customer is 2-Apr-2024</p>
    //     <p>Click here ➡️ <a href="${url}">RGAS</a></p>
    //     `
    let subject: any = this.genSubject(claim)
    let reportText: any = this.getNameReport(data.name)
    let type = claim?.type ? claim.type : '-'
    let occurredLocation = claim?.occurredLocation ? claim.occurredLocation : ''
    let html: any = this.htmlSection
    html = html.replaceAll('$dear', dear)
    html = html.replaceAll('$link', url)
    html = html.replaceAll('$type', type)
    html = html.replaceAll('$occurredLocation', occurredLocation)
    html = html.replaceAll('$reportText', reportText)
    return {
      html: html,
      subject: subject,
      to: to.map((t: any) => t.email),
      cc: []
    }
  }
  toEngineer(claim: any, data: any, to: any[]) {
    let url = `${this.linkMail}/engineer/analysis?registerNo=${claim.registerNo}&no=${claim.no}`

    let dear = to.map((t: any) => {
      return `${t.name} san `
    })
    // let symbol = this.getSymbol(data.occurredLocation)
    // let qtyTxt = Number(claim.qty) > 1 ? 'pcs' : 'pc'
    // let subject: any = `📦[REPORT] ${symbol}${claim.customerName} ${claim.occurredLocation} ${claim.size} #${claim.modelNo} ${claim.descriptionENG} ${claim.qty} ${qtyTxt} ${claim.claimNo}.`
    // let subject: any = this.genSubject(claim)

    // let reportText: any = this.getNameReport(data.name)

    // let html: any = `<p><strong>Dear ${dear},</strong></p>
    //     <p><strong>Thank you for your support.</strong></p>

    //     <p>We would like to inform and share claim information from customer ${claim.type} occurred ${claim.occurredLocation}.
    //     Please see details below.</p>
    //     <p></p>
    //     <p>Could you please review ${reportText} as attached?</p>
    //     <p><strong>Remark :</strong></p>
    //     <p>1. Due date submit to Kubota san is 1-Apr-2024</p>
    //     <p>2. Due date submit to Customer is 2-Apr-2024</p>
    //     <p>Click here ➡️ <a href="${url}">RGAS</a></p>
    //     `
    let subject: any = this.genSubject(claim)
    let reportText: any = this.getNameReport(data.name)
    let type = claim?.type ? claim.type : '-'
    let occurredLocation = claim?.occurredLocation ? claim.occurredLocation : ''
    let html: any = this.htmlSection
    html = html.replaceAll('$dear', dear)
    html = html.replaceAll('$link', url)
    html = html.replaceAll('$type', type)
    html = html.replaceAll('$occurredLocation', occurredLocation)
    html = html.replaceAll('$reportText', reportText)
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
    let option = this.symbol.find((sym: any) => sym.value.includes(value))
    if (option) {
      return option.sym
    } else {
      return '☐'
    }
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

  genSubject(data: any) {
    let symbolStr = this.getSymbol(data.occurredLocation)
    let customerName = data?.customerName ? data.customerName : ''
    let occurredLocation = data?.occurredLocation ? data.occurredLocation : ''
    let size = data?.size ? data.size : ''
    let modelNo = data?.modelNo ? data.modelNo : ''
    let descriptionENG = data?.descriptionENG ? data.descriptionENG : ''
    let qty = data?.qty ? data.qty : ''
    let qtyTxt = Number(data.qty) > 1 ? 'pcs' : 'pc'
    let claimNo = data?.claimNo ? data.claimNo : ''
    let subject: any = `📦[REPORT] ${symbolStr}${customerName} ${occurredLocation} ${size} #${modelNo} ${descriptionENG} ${qty} ${qtyTxt} ${claimNo}. `
    return subject
  }
  genSubjectInformation(data: any) {
    let symbolStr = this.getSymbol(data.occurredLocation)
    let type = data?.type ? data.type : ''
    let occurredLocation = data?.occurredLocation ? data.occurredLocation : ''
    let size = data?.size ? data.size : ''
    let modelNo = data?.modelNo ? data.modelNo : ''
    let descriptionENG = data?.descriptionENG ? data.descriptionENG : ''
    let qty = data?.qty ? data.qty : ''
    let qtyTxt = Number(data.qty) > 1 ? 'pcs' : 'pc'
    let claimNo = data?.claimNo ? data.claimNo : ''
    let subject: any = `${symbolStr}${type} ${occurredLocation} ${size} #${modelNo} ${descriptionENG} ${qty} ${qtyTxt} ${claimNo}.`
    return subject
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
