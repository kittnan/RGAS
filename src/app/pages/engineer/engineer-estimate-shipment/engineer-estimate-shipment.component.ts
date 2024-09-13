import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpEstimateShipmentService } from 'src/app/https/http-estimate-shipment.service';
import { HttpModelsService } from 'src/app/https/http-models.service';
import * as Exceljs from 'exceljs'
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-engineer-estimate-shipment',
  templateUrl: './engineer-estimate-shipment.component.html',
  styleUrls: ['./engineer-estimate-shipment.component.scss']
})
export class EngineerEstimateShipmentComponent implements OnInit {

  displayedColumns: string[] = [];
  columns: any = []
  columns2: any = []
  dataSource = new MatTableDataSource([])
  yearSelect: number | string = '2024'

  monthOption: any = []
  monthAllSelect: boolean = false
  monthSelect: any = []

  yearOption: any = []

  iframeSrc: any
  file: any
  constructor(
    private $model: HttpModelsService,
    private $estimate: HttpEstimateShipmentService,
    private $excel: ExcelService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const c_month = moment().format('MMM-YY')
      this.monthSelect = [c_month]
      // this.monthSelect = await this.generateMonthsArray('Jan')

      const resYearOption: any = await lastValueFrom(this.$estimate.yearOption())
      console.log("🚀 ~ resYearOption:", resYearOption)
      this.yearOption = resYearOption.map((item: any) => item._id)
      this.getData()
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }
  changeYear(year: any) {
    this.yearSelect = Number(year)
    this.monthSelect = []
    this.getData()
  }
  async getData() {
    try {
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

      this.columns = [
        {
          columnDef: 'Model',
          header: 'Model',
          type: 'text',
          cell: (elm: any) => elm['Model']
        },
        {
          columnDef: 'KYD Cd',
          header: 'KYD Cd',
          type: 'text',
          cell: (elm: any) => elm['KYD Cd']
        },
        {
          columnDef: 'Model Name',
          header: 'Model Name',
          type: 'text',
          cell: (elm: any) => elm['Model Name']
        },
        {
          columnDef: 'Biz Segment',
          header: 'Biz Segment',
          type: 'text',
          cell: (elm: any) => elm['Biz Segment']
        },
        {
          columnDef: 'Process',
          header: 'Process',
          type: 'text',
          cell: (elm: any) => elm['Process']
        },
        {
          columnDef: 'Customer',
          header: 'Customer',
          type: 'text',
          cell: (elm: any) => elm['Customer']
        },
        {
          columnDef: 'Classification',
          header: 'Classification',
          type: 'text',
          cell: (elm: any) => elm['Classification']
        },
        {
          columnDef: 'Project Name',
          header: 'Project Name',
          type: 'text',
          cell: (elm: any) => elm['Project Name']
        },
      ]
      this.columns2 = [
        {
          columnDef: 'Sum',
          header: 'Sum',
          type: 'text',
          cell: (elm: any) => elm['Sum']
        }
      ]
      let columnMonth = this.monthSelect.map((month: string) => {
        return {
          columnDef: month,
          header: month,
          type: 'input',
          cell: (elm: any) => elm[month]
        }
      })
      this.columns = this.columns.concat(columnMonth)
      this.columns2 = this.columns2.concat(columnMonth)
      console.log("🚀 ~ this.columns2:", this.columns2)
      this.displayedColumns = this.columns.map((c: any) => c.columnDef);
      // this.displayedColumns = ['Model', 'KYD Cd', 'Model Name', 'Biz Segment', 'Process', 'Customer', 'Classification', 'Project Name', ...months]
      // this.columns = [...this.displayedColumns]


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
      body = body.map((item: any) => {
        let it = resDataOfYear.find((item2: any) => item2.Model == item.Model)
        if (it) {
          return it
        }
        return item
      })
      this.dataSource = new MatTableDataSource(body)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

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

  async onSubmit(row: any, col: any, i_col: number, i_row: number) {
    const id = i_row + '-' + i_col
    const div1 = document.getElementById(id)
    const id_next = i_row + 1 + '-' + i_col
    let div2: any = document.getElementById(id_next)
    await lastValueFrom(this.$estimate.createOrUpdate([row]))
    div2.focus()
    div2.select();
    div2.classList.add('highlight-td')
  }
  inputFocus(i_col: number, i_row: number) {
    const id = i_row + '-' + i_col
    const div1: any = document.getElementById(id)
    div1.focus()
    div1.select();
    div1.classList.add('highlight-td')
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
  cancel() {
    location.reload()
  }
  async uploadSubmit() {
    try {
      if (this.file) {
        const wb = new Exceljs.Workbook();
        await wb.xlsx.load(this.file);
        const ws: Exceljs.Worksheet | undefined = wb.getWorksheet(1);
        const data: any = await this.$excel.excelSheetToObject(ws)
        if (data?.length != 0) {
          data.forEach((d: any) => d.year = this.yearSelect);
          const resUpdateEstimate = await lastValueFrom(this.$estimate.createOrUpdate(data))
          location.reload()
        }
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
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

}
