import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as Exceljs from 'exceljs'
import { lastValueFrom } from 'rxjs';
import { HttpEstimateShipmentService } from 'src/app/https/http-estimate-shipment.service';
import { ExcelService } from 'src/app/services/excel.service';
import moment from 'moment';

@Component({
  selector: 'app-dialog-engineer-estimate-shipment2',
  templateUrl: './dialog-engineer-estimate-shipment2.component.html',
  styleUrls: ['./dialog-engineer-estimate-shipment2.component.scss']
})
export class DialogEngineerEstimateShipment2Component implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $estimate: HttpEstimateShipmentService,
    private $excel: ExcelService,
    private $dialog: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }
  async uploadSubmit() {
    try {
      if (this.data.file) {
        const wb = new Exceljs.Workbook();
        await wb.xlsx.load(this.data.file);
        const ws: Exceljs.Worksheet | undefined = wb.getWorksheet(1);
        const data: any = await this.$excel.excelSheetToObject(ws)
        const yearOption: any = await this.groupYear(data)
        const dataReducing = await this.mappingData(data, yearOption)
        const resUpdateEstimate = await lastValueFrom(this.$estimate.createOrUpdate(dataReducing))
        this.$dialog.close(resUpdateEstimate)
        // if (yearOption?.length != 1) {
        //   throw 'Please upload only 1 year.'
        // }
        // if (data?.length != 0) {
        //   data.forEach((d: any) => d.year = yearOption[0]);
        //   const resUpdateEstimate = await lastValueFrom(this.$estimate.createOrUpdate(data))
        //   // location.reload()
        // }
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  private groupYear(data: any) {
    return new Promise(resolve => {
      let year: any[] = []
      for (let i = 0; i < data.length; i++) {
        const element: any = data[i];
        for (const key in element) {
          if (moment(key, 'MMM-YY').isValid() && !year.some((y: any) => y == moment(key, 'MMM-YY').format('YY'))) {
            year.push(moment(key, 'MMM-YY').format('YY'))
          }
        }
      }
      resolve(year)
    })
  }
  private mappingData(data: any, years: any = []) {
    return new Promise(resolve => {
      const dataMapping = data.map((d: any) => {
        d.Model = d.Model.toString()
        return years.map((year: any) => {
          const temp: any = {
            year: moment(year, 'YY').format('YYYY')
          }
          for (const key in d) {
            const element = d[key];
            if (moment(key, 'MMM-YY').isValid() && moment(key, 'MMM-YY').format('YY') == year) {
              temp[key] = element
            } else if (!moment(key, 'MMM-YY').isValid()) {
              temp[key] = element
            }
          }
          return temp
        })
      })
      const dataReducing = dataMapping.reduce((p: any, n: any) => p.concat(n), [])
      resolve(dataReducing)
    })

  }

}
