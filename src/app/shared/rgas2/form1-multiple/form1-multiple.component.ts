import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MonthSelectComponent } from '../../dialogs/month-select/month-select.component';

import * as ExcelJS from 'exceljs'
import { HttpModelsService } from 'src/app/https/http-models.service';
import { HttpParams } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/https/http-masters.service';

const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form1-multiple',
  templateUrl: './form1-multiple.component.html',
  styleUrls: ['./form1-multiple.component.scss']
})
export class Form1MultipleComponent implements OnInit {
  monthOption = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];

  costMonth: any = ''

  tempOption: any[] = [
    {
      value: '1',
      viewValue: '11111'
    },
    {
      value: '2',
      viewValue: '22222'
    },
  ]


  date: FormControl = new FormControl('')

  dataExcelRead: any = {}


  item: any = {
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

  }
  // formGroup: FormGroup = new FormGroup({
  //   claimNo: new FormControl(null, Validators.required),
  //   modelNo: new FormControl(null, Validators.required),
  //   productNo: new FormControl(),
  //   customerNo: new FormControl(),
  //   modelCode: new FormControl('', Validators.required),
  //   analysisPIC: new FormControl(null, Validators.required),
  //   customerName: new FormControl(null, Validators.required),
  //   type: new FormControl(),
  //   descriptionJP: new FormControl(),
  //   saleCompany: new FormControl(),
  //   sideNo: new FormControl(null, Validators.required),
  //   descriptionENG: new FormControl(null, Validators.required),
  //   salePIC: new FormControl(),
  //   qty: new FormControl(null, Validators.required),
  //   functionAppearance: new FormControl(),
  //   returnStyle: new FormControl(),
  //   productLotNo: new FormControl(null, Validators.required),
  //   AWBNo: new FormControl(),
  //   modelClassification: new FormControl(),
  //   productionMonth: new FormControl(),
  //   InvNo: new FormControl(),
  //   calendarYear: new FormControl(),
  //   commercialDistribution: new FormControl(),
  //   dateReceiveInv: new FormControl(),
  //   claimRegisterDate: new FormControl(),
  //   useAppearance: new FormControl(),
  //   transportationCost: new FormControl(),
  //   unit: new FormControl(),
  //   receiveInfoDate: new FormControl(),
  //   occurredLocation: new FormControl(),
  //   costMonth: new FormControl(),
  //   dueDate: new FormControl(),
  //   importance: new FormControl(),
  //   files: new FormControl(),

  // })


  modelOption: any[] = []
  modelOptionString: string[] = []

  customerOptionString: string[] = []

  functionAppearanceOptionString: string[] = ['Function', 'Appearance']

  returningStyleOption: any = []

  modelClassificationOption: any = []

  commercialDistributionOption: any = []

  useAppearancelicationOption: any = []

  currencyOption: any = []

  occurredLocationOption: any = []

  claimRankOptionString: string[] = ['S >= 3 pcs', 'A = 2 pcs', 'B = 1 pc']



  // modelOptionString!: Observable<string[]>

  // modelCodeCtrl: FormControl<string> = this.claimInfoCtrl.get('modelCode') as FormControl<string>;

  allItems!: any[]
  itemNowNumber: number = 1
  itemMax: number = 1
  itemMin: number = 1
  @ViewChild('fileUpload', { static: true }) fileUpload!: ElementRef;


  constructor(
    public dialog: MatDialog,
    private $model: HttpModelsService,
    private $master: HttpMastersService
  ) {

  }

  async ngOnInit(): Promise<void> {

    // this.formGroup.markAllAsTouched()

    this.modelOption = await lastValueFrom(this.$model.get(new HttpParams()))
    // this.modelOptionString = new Observable<string[]>((observer) => {
    //   const data: string[] = this.modelOption.map((item: any) => item['Model'].toString())
    //   observer.next(data)
    //   observer.complete()
    // })
    this.modelOptionString = this.modelOption.map((item: any) => item['Model'].toString())
    let customerOptionString: string[] = this.modelOption.map((item: any) => item['Customer'] ? item['Customer'] : '').filter((item: any) => item)
    this.customerOptionString = [...new Set(customerOptionString.map(item => item))];

    this.returningStyleOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['returningStyle']))))

    this.modelClassificationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['modelClassification']))))

    this.commercialDistributionOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['commercialDistribution']))))

    this.useAppearancelicationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['useAppearancelication']))))

    this.currencyOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['currency']))))

    this.occurredLocationOption = await lastValueFrom(this.$master.get(new HttpParams().set('groupName', JSON.stringify(['occurredLocation']))))

    this.allItems = [this.item, this.item]
    this.itemMax = this.allItems.length
  }


  setYear(e: moment.Moment) {
    this.date.setValue(e.format('YYYY'))
  }

  emitYear(e: any) {
    this.item.get('calendarYear')?.patchValue(e)
  }

  monthSelect() {
    return new Promise(resolve => {
      this.dialog.open(MonthSelectComponent).afterClosed().subscribe((res: any) => {
        if (res) {
          resolve(moment(`2020-${res}-01`).format('MMMM'))
        } else {
          resolve(null)
        }
      })
    })
  }

  async onUploadFile($event: any) {
    let file: any = $event.target.files[0] as File;
    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.load(file);

      // Assuming there is only one sheet in the workbook
      const worksheet: ExcelJS.Worksheet | undefined = workbook.getWorksheet(1);

      if (worksheet) {
        const claimNo: any = this.getValueOfCell('J2', worksheet)
        const customerNo: any = this.getValueOfCell('AQ14', worksheet)
        let productType = this.getValueOfCell('J8', worksheet)
        let model: any = this.modelOption.find((item: any) => item['KYD Cd'] == productType)
        const customerName: any = this.getValueOfCell('W10', worksheet)

        this.itemMax = Number(this.getValueOfCell('AV17', worksheet))
        this.item.patchValue({
          claimNo: claimNo,
          customerNo: customerNo,
          modelCode: model ? model.Model : null,
          modelNo: model ? model['Model Name'] : null,
          customerName: customerName,
          saleCompany: this.getValueOfCell('AQ23', worksheet),
          qty: this.getValueOfCell('AV17', worksheet),
          productLotNo: this.getValueOfCell('M26', worksheet)

        })
        this.fileUpload.nativeElement.value = ''
      }
      console.log('Excel file successfully read.');
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  }

  getValueOfCell(address: string, ws: ExcelJS.Worksheet) {
    let value: any = ws.getCell(address).value
    value = value?.result ? value.result : value
    return value
  }
  clearValue(key: string) {
    console.log(this.item.get(key));
    this.item.get(key)?.patchValue(null)
  }
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.id === value.id;
  }

  async monthSelectProductionMonth(key: string) {
    const month = await this.monthSelect()
    this.item.get(key)?.patchValue(month)
  }

  onChangeModelCode($event: FormControl<any>) {
    let value: any = $event.value
    const founded: any = this.modelOption.find((item: any) => item['Model'] == value)
    if (founded) {
      this.item.get('modelNo')?.patchValue(founded['Model Name'])
    } else {
      this.item.get('modelNo')?.patchValue('')
    }
  }
  onChangeCustomer($event: FormControl<any>) {
    let value: any = $event.value
    const founded: any = this.modelOption.find((item: any) => item['Model'] == value)
    if (founded) {
      this.item.get('modelNo')?.patchValue(founded['Model Name'])
    } else {
      this.item.get('modelNo')?.patchValue('')
    }
  }

  onNextItem() {
    let newItemNumber: number = this.itemNowNumber
    newItemNumber = newItemNumber + 1
    if (newItemNumber <= this.itemMax) {
      this.itemNowNumber = newItemNumber
    }
  }
  onPreviousItem() {
    let newItemNumber: number = this.itemNowNumber
    newItemNumber = newItemNumber - 1
    if (newItemNumber >= this.itemMin) {
      this.itemNowNumber = newItemNumber
    }
  }
  onFirstItem() {
    this.itemNowNumber = this.itemMin
  }
  onLastItem() {
    this.itemNowNumber = this.itemMax
  }

  emit(event: FormGroup, index: number) {
    this.allItems[index] = event
  }

  public get modelCode(): FormControl<any> {
    return this.item.get('modelCode') as FormControl<any>;
  }
  public get type(): FormControl<any> {
    return this.item.get('type') as FormControl<any>;
  }

}
