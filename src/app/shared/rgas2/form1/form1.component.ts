import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as ExcelJS from 'exceljs';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/https/http-masters.service';
import { HttpModelsService } from 'src/app/https/http-models.service';

import { MonthSelectComponent } from '../../dialogs/month-select/month-select.component';



interface FORM1 {
  [key: string]: any,
  claimNo: any,
  modelNo: any,
  productNo: any,
  customerNo: any,
  modelCode: any,
  analysisPIC: any,
  customerName: any,
  type: any,
  descriptionJP: any,
  saleCompany: any,
  sideNo: any,
  descriptionENG: any,
  salePIC: any,
  qty: any,
  functionAppearance: any,
  returnStyle: any,
  productLotNo: any,
  AWBNo: any,
  modelClassification: any,
  productionMonth: any,
  InvNo: any,
  calendarYear: any,
  commercialDistribution: any,
  dateReceiveInv: any,
  claimRegisterDate: any,
  useAppearance: any,
  transportationCost: any,
  unit: any,
  receiveInfoDate: any,
  occurredLocation: any,
  costMonth: any,
  dueDate: any,
  importance: any,
  files: any,
  status: any,
  index?: any
}

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
})
export class Form1Component implements OnInit {

  @Input() form: FORM1 = {
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
  @Output() formChange: EventEmitter<any> = new EventEmitter()
  @Output() maxChange: EventEmitter<any> = new EventEmitter()
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


  @ViewChild('fileUpload', { static: true }) fileUpload!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private $model: HttpModelsService,
    private $master: HttpMastersService,
  ) {

  }

  async ngOnInit(): Promise<void> {

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

  }






  // todo upload OBL
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

        this.form = {
          ...this.form,
          claimNo: claimNo,
          customerNo: customerNo,
          modelCode: model ? model.Model : null,
          modelNo: model ? model['Model Name'] : null,
          customerName: customerName,
          saleCompany: this.getValueOfCell('AQ23', worksheet),
          qty: this.getValueOfCell('AV17', worksheet),
          productLotNo: this.getValueOfCell('M26', worksheet)

        }
        this.maxChange.emit(this.form.qty)
        this.fileUpload.nativeElement.value = ''
      }
      console.log('Excel file successfully read.');
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  }
  // todo excel fn
  getValueOfCell(address: string, ws: ExcelJS.Worksheet) {
    let value: any = ws.getCell(address).value
    value = value?.result ? value.result : value
    return value
  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.id === value.id;
  }

  async monthSelectProductionMonth(key: string) {
    const month = await this.monthSelect()
    this.form[key] = month
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
  onChangeModelCode($event: any) {
    let value: any = $event
    const founded: any = this.modelOption.find((item: any) => item['Model'] == value)
    if (founded) {
      this.form['modelNo'] = founded['Model Name']
    } else {
      this.form['modelNo'] = ''
    }
  }
  emitYear(e: any, key: string) {
    this.form[key] = e
  }

  // todo test fn
  foo() {
    console.log(this.form);
    this.formChange.emit(this.form)
  }

}
