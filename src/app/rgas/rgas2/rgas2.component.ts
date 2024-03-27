import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rgas2',
  templateUrl: './rgas2.component.html',
  styleUrls: ['./rgas2.component.scss']
})
export class Rgas2Component implements OnInit {
  allItems: any[] = []
  itemNowNumber: number = 1
  itemMax: number = 1
  itemMin: number = 1
  itemNumberList: any[] = [1]

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

  // todo for toggle form
  showForm: boolean = true
  constructor() { }

  ngOnInit(): void {
    this.addAllItemsForm()
  }

  // todo paginator
  onNextItem() {
    let newItemNumber: number = this.itemNowNumber
    newItemNumber = newItemNumber + 1
    if (newItemNumber <= this.itemMax) {
      this.itemNowNumber = newItemNumber
      this.toggleForm('flashShow')
    }
  }
  onPreviousItem() {
    let newItemNumber: number = this.itemNowNumber
    newItemNumber = newItemNumber - 1
    if (newItemNumber >= this.itemMin) {
      this.itemNowNumber = newItemNumber
      this.toggleForm('flashShow')

    }
  }
  onFirstItem() {
    this.itemNowNumber = this.itemMin
  }
  onLastItem() {
    this.itemNowNumber = this.itemMax
  }
  onChooseItem(index: number) {
    this.itemNowNumber = index
    this.toggleForm('flashShow')
  }
  updateItemNumberList() {
    const newArray2 = Array.from({ length: this.itemMax }, (_, index) => index + 1);
    this.itemNumberList = newArray2
  }
  onMaxChange(emitMax: number) {
    this.allItems = []
    this.itemMax = emitMax
    for (let i = 0; i < emitMax; i++) {
      // this.addAllItemsForm()
    }
    // this.updateItemNumberList()
  }

  // todo for toggle form
  toggleForm(mode: string) {
    if (mode == 'show') {
      this.showForm = true
    }
    if (mode == 'hide') {
      this.showForm = false
    }
    if (mode == 'flashShow') {
      this.showForm = false
      setTimeout(() => {
        this.showForm = true
      }, 200);
    }
  }

  // todo push allItems form
  addAllItemsForm() {
    this.allItems.push({
      ...this.dataStructure,
      index: this.allItems.length + 1
    })

  }


}
