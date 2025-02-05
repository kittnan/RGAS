import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpEstimateShipmentService } from 'src/app/https/http-estimate-shipment.service';
import { VirtualDataInterface } from '../engineer-estimate-shipment2/engineer-estimate-shipment2.component';

@Component({
  selector: 'app-engineer-delivery-view',
  templateUrl: './engineer-delivery-view.component.html',
  styleUrls: ['./engineer-delivery-view.component.scss']
})
export class EngineerDeliveryViewComponent implements OnInit {

  year: any = new Date()
  dateFormat = 'YYYY'
  dataSet: any = []
  headers: any = []
  headersAddition: any = []
  sum: any = [
    {
      name: 'TOTAL',
      target: '',
      data: {},
      key: 'est',
      keyName: 'Estimate'
    },
    {
      name: 'TOTAL',
      target: '',
      data: {},
      key: 'act',
      keyName: 'Actual'
    },
    {
      name: 'AUTO',
      target: 'AUTO',
      data: {},
      key: 'est',
      keyName: 'Estimate'
    },
    {
      name: 'AUTO',
      target: 'AUTO',
      data: {},
      key: 'act',
      keyName: 'Actual'
    },
    {
      name: 'INDUSTRY',
      target: 'INDUSTRY',
      data: {},
      key: 'est',
      keyName: 'Estimate'
    },
    {
      name: 'INDUSTRY',
      target: 'INDUSTRY',
      data: {},
      key: 'act',
      keyName: 'Actual'
    },
    {
      name: 'TFTM  HUD',
      target: 'TFTM  HUD',
      data: {},
      key: 'est',
      keyName: 'Estimate'
    },
    {
      name: 'TFTM  HUD',
      target: 'TFTM  HUD',
      data: {},
      key: 'act',
      keyName: 'Actual'
    },
    // {
    //   name: 'TFTM  HUD',
    //   target: 'TFTM  HUD',
    //   data: {}
    // },
    // {
    //   name: 'INDUSTRY',
    //   target: 'INDUSTRY',
    //   data: {}
    // },
    // {
    //   name: 'Nippon seiki',
    //   target: 'Nippon seiki',
    //   data: {}
    // },
  ]
  tableHeadShow: boolean = true
  staticDisplayShow: boolean = false
  staticDataDisplay: any[] = []
  constructor(
    private $shipment: HttpEstimateShipmentService,
    private $loader: NgxUiLoaderService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.getData()
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  async getData() {
    try {
      this.$loader.start()
      let p0: HttpParams = new HttpParams()
      p0 = p0.set('year', moment(this.year).format('YYYY'))
      let resDataOfYear: any = await lastValueFrom(this.$shipment.get(p0))
      this.dataSet = resDataOfYear.map((item: any, index: number) => {
        item.index = index
        return item
      })
      console.log("🚀 ~ this.dataSet:", this.dataSet)
      this.configTable(resDataOfYear)

    } catch (error) {
      console.log("🚀 ~ error:", error)
      this.$loader.stopAll()
    } finally {
      this.$loader.stopAll()
    }
  }
  async configTable(resDataOfYear: any) {
    const firstObj = resDataOfYear[0]
    this.headers = ['Model', 'KYD Cd', 'Model Name', 'Biz Segment', 'Process', 'Customer', 'Classification', 'Project Name']
    const monthToNumber: any = (month: any) => {
      const months: any = {
        "Jan": 0,
        "Feb": 1,
        "Mar": 2,
        "Apr": 3,
        "May": 4,
        "Jun": 5,
        "Jul": 6,
        "Aug": 7,
        "Sep": 8,
        "Oct": 9,
        "Nov": 10,
        "Dec": 11
      };
      return months[month.slice(0, 3)];
    };

    let headersAddition: any = await this.mappingHeaderAddition(firstObj)
    const sortedDates = headersAddition.sort((a: any, b: any) => {
      const [monthA, yearA] = a.split("-");
      const [monthB, yearB] = b.split("-");
      const yearDifference = yearA - yearB; // Compare years
      return yearDifference !== 0 ? yearDifference : monthToNumber(monthA) - monthToNumber(monthB); // Compare months if years are equal
    });
    this.headersAddition = sortedDates
    this.sumFooter()
    // this.headers = [...this.headers, ...headerAddition]

    // todo create static data display
    const unique = [...new Set(this.dataSet.map((item: any) => item.Classification))].filter((item: any) => item).sort((a:any,b:any)=> a.toLowerCase().localeCompare(b.toLowerCase()))
    const staticData = unique.map((customer: any) => {
      const monthValueArr = this.headersAddition.map((month: string) => {
        let actKey = `act-${month.split('-')[0]}`
        let estKey = `est-${month.split('-')[0]}`
        let foo = this.dataSet.filter((a: any) => a.Classification === customer)
        let foo2 = foo.reduce((p: any, n: any) => {
          if (!isNaN(n[actKey])) {
            p += n[actKey]
          }
          return p
        }, 0)
        let foo3 = foo.reduce((p: any, n: any) => {
          if (!isNaN(n[estKey])) {
            p += n[estKey]
          }
          return p
        }, 0)
        return {
          month: month,
          act: foo2,
          est: foo3
        }
      })
      return {
        customer: customer,
        data: monthValueArr
      }
    })
    this.staticDataDisplay = staticData
  }
  private mappingHeaderAddition(firstObj: any) {
    return new Promise(resolve => {
      let headerAddition: string[] = []
      for (const key in firstObj) {
        if (key.includes('est-')) {
          const str: string = key.replace('est-', '')
          headerAddition.push(`${str}-${moment(firstObj.year, 'YYYY').format('YY')}`)
          headerAddition = headerAddition.sort((a: any, b: any) => a - b)
        }
      }
      resolve(headerAddition)
    })
  }
  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }
  decreaseYear() {
    if (this.year) {
      this.year = moment(this.year).clone().subtract(1, 'year').toDate()
    } else {
      this.year = moment().clone().subtract(1, 'year').toDate()
    }
  }
  increaseYear() {
    if (this.year) {
      this.year = moment(this.year).clone().add(1, 'year').toDate()
    } else {
      this.year = moment().clone().add(1, 'year').toDate()
    }
  }
  showDataRow(data: any, key: string) {
    const key2 = key.split('-')
    const customKey = `est-${key2[0]}`
    return !isNaN(Number(data[customKey])) ? Number(data[customKey]).toLocaleString() : ''
  }
  showDataRow2(data: any, key: string) {
    const key2 = key.split('-')
    const customKey = `act-${key2[0]}`
    return !isNaN(Number(data[customKey])) ? Number(data[customKey]).toLocaleString() : ''
  }

  sumFooter() {
    const columnFooter = this.headersAddition.map((col: any) => col)
    columnFooter.forEach((col: any) => {
      this.sum.map((sum: any) => {
        const col2 = `${sum.key}-${col.split('-')[0]}`
        if (sum.target == '') {
          sum.data[col] = this.showSumMonth(col2)
        } else {
          if (sum.target == 'AUTO') {
            sum.data[col] = this.showSum(col2, 'Biz Segment', '', sum.target)
          } else {
            sum.data[col] = this.showSum(col2, 'Biz Segment', 'Process', sum.target)
          }
        }
      })
    })
  }
  showSumMonth(columnDef: string) {
    const sumNum: number = this.dataSet.reduce((p: any, n: any) => {
      if (!isNaN(Number(n[columnDef]))) {
        p += Number(n[columnDef])
      }
      return p
    }, 0)
    const str: string = sumNum > 0 ? sumNum.toLocaleString() : ''
    return { str, num: sumNum }
  }
  showSum(columnDef: string, key: string, key2: string, value: string) {
    const sumNum: number = this.dataSet.reduce((p: any, n: any) => {
      if (n[key] == value || n[key2] == value) {
        if (!isNaN(Number(n[columnDef]))) {
          p += Number(n[columnDef])
        }
      }
      return p
    }, 0)
    const str: string = sumNum > 0 ? sumNum.toLocaleString() : ''
    return { str, num: sumNum }
  }
}
