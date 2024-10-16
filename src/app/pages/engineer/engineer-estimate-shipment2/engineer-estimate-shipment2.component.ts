import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import moment from 'moment';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { lastValueFrom } from 'rxjs';
import { HttpEstimateShipmentService } from 'src/app/https/http-estimate-shipment.service';
import { HttpModelsService } from 'src/app/https/http-models.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import { DialogEngineerEstimateShipment2Component } from './dialog-engineer-estimate-shipment2/dialog-engineer-estimate-shipment2.component';
export interface VirtualDataInterface {
  index: number;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-engineer-estimate-shipment2',
  templateUrl: './engineer-estimate-shipment2.component.html',
  styleUrls: ['./engineer-estimate-shipment2.component.scss']
})

export class EngineerEstimateShipment2Component implements OnInit {
  @ViewChild('virtualTable', { static: false }) nzTableComponent?: NzTableComponent<VirtualDataInterface>;
  yearOption: any = []
  yearSelect: number | string = '2024'

  monthOption: any = []
  monthAllSelect: boolean = false
  monthSelect: any = []

  columnRef: any = []

  rows: any = []
  rows2: any = []
  sum: any = [
    {
      name: 'TOTAL',
      target: '',
      data: {}
    },
    {
      name: 'AUTO',
      target: 'AUTO',
      data: {}
    },
    {
      name: 'TFTM  HUD',
      target: 'TFTM  HUD',
      data: {}
    },
    {
      name: 'INDUSTRY',
      target: 'INDUSTRY',
      data: {}
    },
    {
      name: 'Nippon seiki',
      target: 'Nippon seiki',
      data: {}
    },
  ]
  file: any
  tableHeadShow: boolean = true
  load: boolean = false
  iframeSrc: any = ''
  constructor(
    private $model: HttpModelsService,
    private $estimate: HttpEstimateShipmentService,
    private $excel: ExcelService,
    public $dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const c_month = moment().format('MMM-YY')
      this.monthSelect = [c_month]
      // this.monthSelect = await this.generateMonthsArray('Jan')

      const resYearOption: any = await lastValueFrom(this.$estimate.yearOption())
      this.yearOption = resYearOption.map((item: any) => item._id)
      this.getData()
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }
  changeYear(year: any) {
    this.checkMonth()
    this.yearSelect = Number(year)
    this.monthSelect = []
    this.getData()
  }
  async getData() {
    try {
      this.load = true
      const monthOption: any = await this.generateMonthsArray()
      this.monthOption = monthOption.map((month: any) => {
        if (this.monthSelect.some((m: any) => m == month)) {
          return {
            month: month,
            value: true
          }
        } else {
          return {
            month: month,
            value: false
          }
        }
      })
      let resModels: any = await lastValueFrom(this.$model.get(new HttpParams()))
      let resDataOfYear: any = await lastValueFrom(this.$estimate.get(new HttpParams().set('year', this.yearSelect)))

      this.columnRef = [
        {
          columnDef: 'Model',
          header: 'Model',
          type: 'text',
          cell: (elm: any) => elm['Model'],
          width: '100px',
          align: 'start',
          nzLeft: true
        },
        {
          columnDef: 'KYD Cd',
          header: 'KYD Cd',
          type: 'text',
          cell: (elm: any) => elm['KYD Cd'],
          width: '100px',
          align: 'start',
          nzLeft: false
        },
        {
          columnDef: 'Model Name',
          header: 'Model Name',
          type: 'text',
          cell: (elm: any) => elm['Model Name'],
          width: '150px',
          align: 'start',
          nzLeft: false
        },
        {
          columnDef: 'Biz Segment',
          header: 'Biz Segment',
          type: 'text',
          cell: (elm: any) => elm['Biz Segment'],
          width: '120px',
          align: 'start',
          nzLeft: false
        },
        {
          columnDef: 'Process',
          header: 'Process',
          type: 'text',
          cell: (elm: any) => elm['Process'],
          width: '100px',
          align: 'start',
          nzLeft: false
        },
        {
          columnDef: 'Customer',
          header: 'Customer',
          type: 'text',
          cell: (elm: any) => elm['Customer'],
          width: '100px',
          align: 'start',
          nzLeft: false
        },
        {
          columnDef: 'Classification',
          header: 'Classification',
          type: 'text',
          cell: (elm: any) => elm['Classification'],
          width: '150px',
          align: 'start',
          nzLeft: false
        },
        {
          columnDef: 'Project Name',
          header: 'Project Name',
          type: 'text',
          cell: (elm: any) => elm['Project Name'],
          width: '300px',
          align: 'start',
          nzLeft: false
        },
      ]

      let columnMonth = this.monthSelect.map((month: string) => {
        return {
          columnDef: month,
          header: month,
          type: 'input',
          cell: (elm: any) => elm[month],
          width: '150px',
          align: 'right',
          nzLeft: false
        }
      })
      this.columnRef = this.columnRef.concat(columnMonth)

      let newMonthObj: any = {}
      this.monthSelect.map((col: any, i: number) => {
        newMonthObj[col] = ''
      })
      let body: any = resModels.map((model: any, i: number) => {
        return {
          ...model,
          ...newMonthObj,
          year: this.yearSelect
        }
      })
      body = body.map((item: any, index: number) => {
        item.index = index
        let it = resDataOfYear.find((item2: any) => item2.Model == item.Model)
        if (it) {
          return it
        }
        return item
      })
      this.rows = body
      this.sumFooter()

    } catch (error) {
      console.log("🚀 ~ error:", error)
      this.load = false
    } finally {
      this.load = false
    }
  }
  sumFooter() {
    const columnFooter = this.columnRef.map((col: any) => col.columnDef)
    columnFooter.forEach((col: any) => {
      if (col.includes('-')) {
        this.sum.map((sum: any) => {
          if (sum.target == '') {
            sum.data[col] = this.showSumMonth(col)
          } else {
            sum.data[col] = this.showSum(col, 'Biz Segment', 'Process', sum.target)
          }
        })
      } else {
        this.sum.map((sum: any) => {
          if (sum.target == '') {
            sum.data[col] = ''
          } else {
            sum.data[col] = ''
          }
        })
      }
    })
  }
  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }
  showSumMonth(columnDef: string) {
    const sumNum: number = this.rows.reduce((p: any, n: any) => {
      if (!isNaN(Number(n[columnDef]))) {
        p += Number(n[columnDef])
      }
      return p
    }, 0)
    const str: string = sumNum > 0 ? sumNum.toLocaleString() : ''
    return str
  }
  showSum(columnDef: string, key: string, key2: string, value: string) {
    const sumNum: number = this.rows.reduce((p: any, n: any) => {
      if (n[key] == value || n[key2] == value) {
        if (!isNaN(Number(n[columnDef]))) {
          p += Number(n[columnDef])
        }
      }
      return p
    }, 0)
    const str: string = sumNum > 0 ? sumNum.toLocaleString() : ''
    return str
  }
  // getColumnType(column: string): string {
  //   // Return the type of column, e.g., 'text' or 'input'
  //   return 'text'; // Adjust based on your column types
  // }


  generateMonthsArray(select: string | null = null) {
    return new Promise(resolve => {
      let month: any[] = []
      const startOfYear = moment(`01-01-${this.yearSelect}`, 'DD-MM-YYYY').startOf('year');
      for (let i = 0; i < 12; i++) {
        if (select) {
          if (startOfYear.clone().add(i, 'months').format('MMM') == select) {
            month.push(startOfYear.clone().add(i, 'months').format('MMM-YY'));
          }
        } else {
          month.push(startOfYear.clone().add(i, 'months').format('MMM-YY'));
        }
      }
      resolve(month)
    })
  }
  uploadAndPreview(e: any) {
    const file = e.target.files[0]
    if (file) {
      this.file = file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const htmlString = XLSX.utils.sheet_to_html(firstSheet);
        const styledHtmlString = `
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
        </style>
        ${htmlString}
      `;
        this.iframeSrc = 'data:text/html;base64,' + this.base64EncodeUnicode(styledHtmlString)
        const dialogRef = this.$dialog.open(DialogEngineerEstimateShipment2Component, {
          data: {
            src: 'data:text/html;base64,' + this.base64EncodeUnicode(styledHtmlString),
            file: this.file,
            yearSelect: this.yearSelect
          },
          width: '90%',
          height: '85%'
        }).afterClosed().subscribe((data: any) => {
          if (data) {
            this.getData()
          }
        })
      }
      reader.readAsArrayBuffer(file);
    }
  }
  base64EncodeUnicode(str: string) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const htmlString = XLSX.utils.sheet_to_html(firstSheet);

      // Render HTML in a hidden div
      const container = document.getElementById('sheet-container');
      if (container) {
        container.innerHTML = htmlString;
        container.style.display = 'block';

        // Convert the rendered HTML to an image
        html2canvas(container).then((canvas) => {
          this.iframeSrc = canvas.toDataURL('image/png');
          container.style.display = 'none';
        });
      }
    };

    reader.readAsArrayBuffer(file);
  }

  downloadImage() {
    if (this.iframeSrc) {
      const link = document.createElement('a');
      link.href = this.iframeSrc;
      link.download = 'excel-image.png';
      link.click();
    }
  }
  cancel() {
    location.reload()
  }

  checkAllMonth() {
    setTimeout(() => {
      if (this.monthAllSelect) {
        this.monthOption.forEach((item: any) => item.value = true);
        this.monthSelect = this.monthOption.filter((month: any) => month.value).map((month: any) => month.month)
        this.getData()
      } else {
        this.monthOption.forEach((item: any) => item.value = false);
        this.monthSelect = this.monthOption.filter((month: any) => month.value).map((month: any) => month.month)
        this.getData()
      }
    }, 300);
  }
  checkMonth() {
    setTimeout(() => {
      if (this.monthOption.every((month: any) => month.value)) {
        this.monthAllSelect = true
      } else {
        this.monthAllSelect = false
      }
      this.monthSelect = this.monthOption.filter((month: any) => month.value).map((month: any) => month.month)
      this.getData()
    }, 300);
  }
  async onSubmit(row: any, col: any, i_col: number, i_row: number, event: KeyboardEvent) {

    if (event.code == 'Tab') {
      const id = i_row + 'x' + i_col
      const id_next = i_row + 'x' + i_col + 1
      const res = await lastValueFrom(this.$estimate.createOrUpdate([row]))
      let div1: any | null = document.getElementById(id)
      let div2: any | null = document.getElementById(id_next)
      this.sumFooter()
      if (div1 && div2 && res) {
        div2.focus()
        div2.select()
        div1.classList.add('highlight-td-active')
      }
    }
    if (event.code == 'Enter') {
      const id = i_row + 'x' + i_col
      const id_next = i_row + 1 + 'x' + i_col
      const res = await lastValueFrom(this.$estimate.createOrUpdate([row]))
      let div1: any | null = document.getElementById(id)
      let div2: any | null = document.getElementById(id_next)
      this.sumFooter()
      if (div2 && res) {
        div2.focus()
        div2.select()
        div1.classList.add('highlight-td-active')
      }
    }
  }
}
