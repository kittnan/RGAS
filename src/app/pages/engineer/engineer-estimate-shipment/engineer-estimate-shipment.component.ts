import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpEstimateShipmentService } from 'src/app/https/http-estimate-shipment.service';
import { HttpModelsService } from 'src/app/https/http-models.service';

@Component({
  selector: 'app-engineer-estimate-shipment',
  templateUrl: './engineer-estimate-shipment.component.html',
  styleUrls: ['./engineer-estimate-shipment.component.scss']
})
export class EngineerEstimateShipmentComponent implements OnInit {

  displayedColumns: string[] = [];
  columns: any = []
  dataSource = new MatTableDataSource([])
  constructor(
    private $model: HttpModelsService,
    private $estimate: HttpEstimateShipmentService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let resModels: any = await lastValueFrom(this.$model.get(new HttpParams()))
      let months: any = await this.generateMonthsArray()
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
      let columnMonth = months.map((month: string) => {
        return {
          columnDef: month,
          header: month,
          type: 'input',
          cell: (elm: any) => elm[month]
        }
      })
      this.columns = this.columns.concat(columnMonth)
      this.displayedColumns = this.columns.map((c: any) => c.columnDef);
      // this.displayedColumns = ['Model', 'KYD Cd', 'Model Name', 'Biz Segment', 'Process', 'Customer', 'Classification', 'Project Name', ...months]
      // this.columns = [...this.displayedColumns]


      let newMonthObj: any = {}
      months.map((col: any, i: number) => {
        newMonthObj[col] = ''
      })
      let body: any = resModels.map((model: any, i: number) => {
        return {
          ...model,
          ...newMonthObj,
          year: moment().format('YYYY')
        }
      })
      this.dataSource = new MatTableDataSource(body)
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  generateMonthsArray() {
    return new Promise(resolve => {
      let month: any[] = []
      const startOfYear = moment().startOf('year');
      for (let i = 0; i < 12; i++) {
        month.push(startOfYear.clone().add(i, 'months').format('MMM-YY'));
      }
      resolve(month)
    })
  }

  async foo(row: any, col: any) {
    console.log(row, col);
    await lastValueFrom(this.$estimate.createOrUpdate([row]))
  }

}
