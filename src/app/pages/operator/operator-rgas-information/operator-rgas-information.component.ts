import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpMailService } from 'src/app/https/http-mail.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-operator-rgas-information',
  templateUrl: './operator-rgas-information.component.html',
  styleUrls: ['./operator-rgas-information.component.scss']
})
export class OperatorRgasInformationComponent implements OnInit {

  dataStructure = {
    claimNo: null,
    modelNo: null,
    productNo: null,
    customerNo: null,
    modelCode: null,
    analysisPIC: null,
    customerName: null,
    type: null,
    descriptionJP: null,
    saleCompany: null,
    sideNo: null,
    descriptionENG: null,
    salePIC: null,
    qty: null,
    functionAppearance: null,
    returnStyle: null,
    productLotNo: null,
    AWBNo: null,
    modelClassification: null,
    productionMonth: null,
    InvNo: null,
    calendarYear: null,
    commercialDistribution: null,
    dateReceiveInv: null,
    claimRegisterDate: null,
    useAppearance: null,
    transportationCost: null,
    unit: null,
    receiveInfoDate: null,
    occurredLocation: null,
    costMonth: null,
    dueDate: null,
    importance: null,
    files: null,
    status: null
  }
  allItems: any[] = []
  itemNowNumber: number = 1
  itemMax: number = 1
  show: boolean = true
  result: any

  currentItem: any
  constructor(
    private $claim: HttpClaimService,
    private route: ActivatedRoute,
    private $result: HttpResultService,
    private $loader: NgxUiLoaderService,
    private router: Router,
    private $mail: HttpMailService,
    private $local: LocalStoreService
  ) {
    this.route.queryParams.subscribe(async (linkParam: any) => {
      if (linkParam && linkParam['registerNo']) {
        let params: HttpParams = new HttpParams()
        params = params.set('registerNo', JSON.stringify([linkParam['registerNo']]))
        const resData: any = await lastValueFrom($claim.get(params))
        this.allItems = resData
        this.currentItem = this.allItems[0]
        if (linkParam['no']) {
          this.currentItem = this.allItems.find((item: any) => item.no == linkParam['no'])
        }
        // this.show = true
      } else {
        this.allItems = [this.dataStructure]
        this.currentItem = this.allItems[0]
        // this.show = true
      }
    })
  }

  ngOnInit(): void {

  }

  async formChange() {
    const resData = await lastValueFrom(this.$claim.createOrUpdate(this.currentItem))
    // if (resData && resData.length > 0) {
    //   this.currentItem = resData[0]
    //   console.log("🚀 ~ this.currentItem:", this.currentItem)
    // }
  }

  // todo finish form1
  async submitChange($event: any) {
    console.log("🚀 ~ $event:", $event)
    let to: any = $event.flowPIC.map((PIC: any) => PIC.email)

    let html = `<p><strong>Dear...All</strong></p>

    <p>&nbsp;</p>

    <p><strong>We&#39;d like to share claim information from $type $occurredLocation $qty&nbsp;</strong></p>

    <p><strong>Please see the detail below and attached file</strong><br />
    &nbsp;</p>

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

    let type = $event.type
    html = html.replace('$type', type)
    let qty = Number($event.qty) > 1 ? `${Number($event.qty)} pcs.` : `${Number($event.qty)} pc.`
    html = html.replace('$qty', qty)


    await lastValueFrom(this.$mail.send({
      to: to,
      html: html
    }))
    await lastValueFrom(this.$claim.createOrUpdate($event))
    let auth = this.$local.getAuth()
    Swal.fire({
      title: 'Success',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate([`${auth}/rgas1`]).then(() => location.reload())
  }

  // todo paginator
  onNextItem() {
    this.$loader.start()
    const index = this.allItems.findIndex((item: any) => item.no == this.currentItem.no)
    if (index != -1) {
      const nextIndex = index + 1
      const nextItem = this.allItems.find((item: any, i: number) => i == nextIndex)
      if (nextItem) {
        this.currentItem = nextItem
      }
    }
    setTimeout(() => {
      this.$loader.stop()
    }, 100,);

  }

  // todo prev item
  onPreviousItem() {
    this.$loader.start()
    const index = this.allItems.findIndex((item: any) => item.no == this.currentItem.no)
    if (index != -1) {
      const nextIndex = index - 1
      const nextItem = this.allItems.find((item: any, i: number) => i == nextIndex)
      if (nextItem) {
        this.currentItem = nextItem
      }
    }
    setTimeout(() => {
      this.$loader.stop()
    }, 100,);
  }
  // todo first item
  onFirstItem() {
    this.$loader.start()
    this.currentItem = this.allItems[0]
    setTimeout(() => {
      this.$loader.stop()
    }, 100,);
  }
  // todo last item
  onLastItem() {
    this.$loader.start()
    this.currentItem = this.allItems[this.allItems.length - 1]
    setTimeout(() => {
      this.$loader.stop()
    }, 100,);
  }
  // todo select item
  onChooseItem(index: number) {
    this.$loader.start()
    this.currentItem = this.allItems.find((item: any) => item.no == index)
    setTimeout(() => {
      this.$loader.stop()
    }, 300,);
  }

  // todo event after copy -> event data is claim all follow registerNo
  copyChange($event: any) {
    try {
      this.allItems = $event
      this.currentItem = $event[$event.length - 1]
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo event when delete item- >
  deleteChange(_id: any) {
    this.allItems = this.allItems.filter((item: any) => item._id !== _id)
    this.currentItem = this.allItems[0]
  }

  // todo cssCurrentItem
  cssCurrentItem(no: number) {
    if (this.currentItem?.no == no) return 'text-current-item'
    return ''
  }

}
