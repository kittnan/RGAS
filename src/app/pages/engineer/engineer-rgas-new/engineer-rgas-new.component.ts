import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';

@Component({
  selector: 'app-engineer-rgas-new',
  templateUrl: './engineer-rgas-new.component.html',
  styleUrls: ['./engineer-rgas-new.component.scss']
})
export class EngineerRgasNewComponent implements OnInit {
  allItems: any[] = []
  currentItem: any
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
  constructor(
    private $claim: HttpClaimService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    try {
      this.route.queryParams.subscribe(async (linkParam: any) => {
        if (linkParam && linkParam['registerNo']) {
          let params: HttpParams = new HttpParams()
          params = params.set('registerNo', JSON.stringify([linkParam['registerNo']]))
          const resData: any = await lastValueFrom(this.$claim.get(params))
          this.allItems = resData
          this.currentItem = this.allItems[0]
          // this.show = true
        } else {
          this.allItems = [this.dataStructure]
          this.currentItem = this.allItems[0]
          // this.show = true
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  async formChange() {
    const resData = await lastValueFrom(this.$claim.createOrUpdate(this.currentItem))
    if (resData && resData.length > 0) {
      this.currentItem = resData[0]
      this.router.navigate(['operator/information'], {
        queryParams: {
          registerNo: this.currentItem.registerNo,
          no: this.currentItem.no
        }
      })
    }
  }
    // todo cssCurrentItem
    cssCurrentItem(no: number) {
      if (this.currentItem?.no == no) return 'text-current-item'
      return ''
    }

}
