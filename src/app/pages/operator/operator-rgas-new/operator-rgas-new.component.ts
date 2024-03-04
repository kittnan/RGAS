import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-operator-rgas-new',
  templateUrl: './operator-rgas-new.component.html',
  styleUrls: ['./operator-rgas-new.component.scss']
})
export class OperatorRgasNewComponent implements OnInit {

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
    status: 'draft',
    no: 1
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
    private router: Router
  ) {
    this.route.queryParams.subscribe(async (linkParam: any) => {
      if (linkParam && linkParam['registerNo']) {
        let params: HttpParams = new HttpParams()
        params = params.set('registerNo', JSON.stringify([linkParam['registerNo']]))
        const resData: any = await lastValueFrom($claim.get(params))
        this.allItems = resData
        this.currentItem = this.allItems[0]
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
    if (resData && resData.length > 0) {
      this.currentItem = resData[0]
      this.router.navigate(['operator/information'],{
        queryParams:{
          registerNo:this.currentItem.registerNo,
          no: this.currentItem.no
        }
      })
    }
  }

  // todo finish form1
  submitChange($event: any) {
    Swal.fire({
      title: 'Do you want to Submit?',
      icon: 'question',
      showCancelButton: true
    }).then(async (v: SweetAlertResult) => {
      if (v.isConfirmed) {
        await lastValueFrom(this.$claim.createOrUpdate($event))
        location.reload()
        alert('send mail')
      }
    })
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
