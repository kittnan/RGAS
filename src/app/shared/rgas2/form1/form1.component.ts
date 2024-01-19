import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MonthSelectComponent } from '../../dialogs/month-select/month-select.component';

import * as ExcelJS from 'exceljs'

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
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
})
export class Form1Component implements OnInit {
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

  claimInfoCtrl: FormGroup = new FormGroup({
    claimNo: new FormControl(null, Validators.required),
    modelNo: new FormControl(null, Validators.required),
    productNo: new FormControl(),
    customerNo: new FormControl(),
    modelCode: new FormControl(null, Validators.required),
    analysisPIC: new FormControl(null, Validators.required),
    customerName: new FormControl(null, Validators.required),
    type: new FormControl(),
    descriptionJP: new FormControl(),
    saleCompany: new FormControl(),
    sideNo: new FormControl(null, Validators.required),
    descriptionENG: new FormControl(null, Validators.required),
    salePIC: new FormControl(),
    qty: new FormControl(null, Validators.required),
    functionAppearance: new FormControl(),
    returnStyle: new FormControl(),
    productLotNo: new FormControl(null, Validators.required),
    AWBNo: new FormControl(),
    modelClassification: new FormControl(),
    productionMonth: new FormControl(),
    InvNo: new FormControl(),
    calendarYear: new FormControl(),
    commercialDistribution: new FormControl(),
    dateReceiveInv: new FormControl(),
    claimRegisterDate: new FormControl(),
    useAppearance: new FormControl(),
    transportationCost: new FormControl(),
    receiveInfoDate: new FormControl(),
    occurredLocation: new FormControl(),
    costMonth: new FormControl(),
    dueDate: new FormControl(),
    importance: new FormControl(),
    files: new FormControl(),

  })

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.claimInfoCtrl.markAllAsTouched()
  }


  setYear(e: moment.Moment) {
    console.log(e);
    this.date.setValue(e.format('YYYY'))
  }

  emitYear(e: any) {
    console.log("🚀 ~ e:", e)

  }
  foo1(e: any) {
    console.log(e);
    this.costMonth = moment(e).format('MMM')
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
    const file: any = $event.target.files[0] as File;
    console.log("🚀 ~ file:", file)
    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.load(file);

      // Assuming there is only one sheet in the workbook
      const worksheet: ExcelJS.Worksheet | undefined = workbook.getWorksheet(1);

      if (worksheet) {
        console.log("🚀 ~ worksheet:", worksheet)
        const claimNo: any = worksheet.getCell('J2').value
        console.log("🚀 ~ claimNo:", claimNo)
        this.dataExcelRead.location = worksheet.getCell('AV15').value
        console.log("🚀 ~ this.dataExcelRead:", this.dataExcelRead)

        this.claimInfoCtrl.patchValue({
          claimNo: claimNo?.result ? claimNo.result : claimNo.value,
          modelNo: '2'
        })
      }
      console.log('Excel file successfully read.');
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  }
  foo() {
    console.log(this.claimInfoCtrl.value);

  }

  clearValue(key: string) {
    console.log(this.claimInfoCtrl.get(key));
    this.claimInfoCtrl.get(key)?.patchValue(null)
  }
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.id === value.id;
  }

  async monthSelectProductionMonth() {
    const month = await this.monthSelect()
    this.claimInfoCtrl.get('productionMonth')?.patchValue(month)
  }
}
