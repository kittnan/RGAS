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
  yearSelect: number | string = '2024'

  monthOption: any = []
  monthAllSelect: boolean = false
  constructor(
    private $model: HttpModelsService,
    private $estimate: HttpEstimateShipmentService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let resModels: any = await lastValueFrom(this.$model.get(new HttpParams()))
      let resDataOfYear: any = await lastValueFrom(this.$estimate.get(new HttpParams().set('year', this.yearSelect)))
      console.log("🚀 ~ resDataOfYear:", resDataOfYear)
      let monthOption: any = await this.generateMonthsArray()
      this.monthOption = monthOption.map((month: any) => {
        return {
          month: month,
          value: false
        }
      })
      let months: any = await this.generateMonthsArray('Jan')
      console.log("🚀 ~ months:", months)
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
      const startOfYear = moment().startOf('year');
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

  async onSubmit(row: any, col: any) {
    await lastValueFrom(this.$estimate.createOrUpdate([row]))
  }

}
