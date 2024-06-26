import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
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
  result: any

  currentItem: any
  saveStatus: boolean = false
  constructor(
    private $claim: HttpClaimService,
    private route: ActivatedRoute,
    private $result: HttpResultService,
    private $loader: NgxUiLoaderService,
    private router: Router,
    private $local: LocalStoreService,
    private $alert: SweetAlertGeneralService,
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
      } else {
        this.allItems = [this.dataStructure]
        this.currentItem = this.allItems[0]
      }
    })
  }

  ngOnInit(): void {

  }

  async formChange() {
    const resData = await lastValueFrom(this.$claim.createOrUpdate(this.currentItem))
    this.saveStatus = false
    this.$alert.success()
  }
  async onAutoSaveChange(event:any){
    const resData = await lastValueFrom(this.$claim.createOrUpdate(this.currentItem))
  }


  // todo finish form1
  async submitChange(event: any) {
    await lastValueFrom(this.$claim.createOrUpdate(event))
    let auth = this.$local.getAuth()
    this.$alert.success()
    this.router.navigate([`${auth}/rgas1`]).then(() => location.reload())
  }

  // todo paginator
  onNextItem() {
    const index = this.allItems.findIndex((item: any) => item.no == this.currentItem.no)
    if (index != -1) {
      const nextIndex = index + 1
      const nextItem = this.allItems.find((item: any, i: number) => i == nextIndex)
      if (nextItem) {
        this.changePage(nextItem)
      }
    }
  }

  // todo prev item
  onPreviousItem() {
    // this.$loader.start()
    const index = this.allItems.findIndex((item: any) => item.no == this.currentItem.no)
    if (index != -1) {
      const nextIndex = index - 1
      const nextItem = this.allItems.find((item: any, i: number) => i == nextIndex)
      if (nextItem) {
        this.changePage(nextItem)
      }


    }
    // setTimeout(() => {
    //   this.$loader.stop()
    // }, 100,);
  }
  // todo first item
  onFirstItem() {
    let nextItem = this.allItems[0]
    this.changePage(nextItem)
  }
  // todo last item
  onLastItem() {
    let nextItem = this.allItems[this.allItems.length - 1]
    this.changePage(nextItem)
  }
  // todo select item
  onChooseItem(index: number) {
    let nextItem = this.allItems.find((item: any) => item.no == index)
    this.changePage(nextItem)
  }

  // todo event after copy -> event data is claim all follow registerNo
  copyChange($event: any) {
    try {
      this.allItems = $event
      let nextItem = $event[$event.length - 1]
      this.changePage(nextItem)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo change page
  changePage(page: any) {
    if (this.saveStatus) {
      Swal.fire({
        title: 'Save?',
        icon: 'question',
        showCancelButton: true
      }).then((v: SweetAlertResult) => {
        if (v.isConfirmed) {
          this.formChange()
          setTimeout(() => {
            this.currentItem = page
          }, 300);
        } else {
          setTimeout(() => {
            this.currentItem = page
          }, 300);
        }
      })
    } else {
      this.currentItem = page
    }
    this.saveStatus = false
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
