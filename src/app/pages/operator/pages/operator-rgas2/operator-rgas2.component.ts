import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';

@Component({
  selector: 'app-operator-rgas2',
  templateUrl: './operator-rgas2.component.html',
  styleUrls: ['./operator-rgas2.component.scss']
})
export class OperatorRgas2Component implements OnInit {
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
  allItems: any[] = [

  ]
  itemNowNumber: number = 1
  itemMax: number = 1

  show: boolean = true

  constructor(
    private $claim: HttpClaimService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(async (linkParam: any) => {
      console.log("🚀 ~ linkParam:", linkParam)
      if (linkParam && linkParam['registerNo']) {
        let params: HttpParams = new HttpParams()
        params = params.set('registerNo', JSON.stringify([linkParam['registerNo']]))
        const resData: any = await lastValueFrom($claim.get(params))
        this.allItems = resData
        console.log("🚀 ~ this.allItems:", this.allItems)
        // this.show = true
      }else{
        this.allItems = [this.dataStructure]
        // this.show = true
      }
    })
  }

  ngOnInit(): void {

  }
  onMaxChange(emitMax: number) {
    this.allItems = []
    this.itemMax = emitMax
    for (let i = 0; i < emitMax; i++) {
      // this.addAllItemsForm()
    }
    // this.updateItemNumberList()
  }

  async formChange() {
    console.log(this.allItems[this.itemNowNumber - 1]);
    let item = this.allItems[this.itemNowNumber - 1]
    item['status'] = 'draft'
    item['no'] = this.itemNowNumber
    const resData = await lastValueFrom(this.$claim.createOrUpdate(item))
    if (resData && resData.length > 0) {
      this.allItems[this.itemNowNumber - 1] = resData[0]
    }
  }
}
