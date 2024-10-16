import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { catchError, delay, lastValueFrom, map, of } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
interface FILTER_OPTION {
  value: string,
  name: string
}
@Component({
  selector: 'app-rgas1-ant',
  templateUrl: './rgas1-ant.component.html',
  styleUrls: ['./rgas1-ant.component.scss'],
})
export class Rgas1AntComponent implements OnInit {

  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  filterOption: FILTER_OPTION[] = [
    {
      value: 'claimNo',
      name: 'Claim No'
    },
    {
      value: 'PIC',
      name: 'PIC'
    },
    {
      value: 'modelNo',
      name: 'Model No'
    },
    {
      value: 'modelName',
      name: 'Model Name'
    },
    {
      value: 'claimMonth',
      name: 'Claim Month'
    },
    {
      value: 'customerInformation',
      name: 'Customer Information'
    },
    {
      value: 'customerName',
      name: 'Customer Name'
    },
    {
      value: 'ktcAnalysisResult',
      name: 'KTC Analysis Result'
    },
    {
      value: 'judgment',
      name: 'Judgment'
    },
    {
      value: 'returnStyle',
      name: 'Return Style'
    },
  ]
  filterSelected: string = ''
  fillSearch: string = ''
  placeholder: string = 'Value'

  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  itemCount: number = 10
  isLoading: boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  claims: any[] = []
  @Output() onClickClaimChange: EventEmitter<any> = new EventEmitter()
  @Output() onClickNewChange: EventEmitter<any> = new EventEmitter()
  @Output() onClaimChange: EventEmitter<any> = new EventEmitter()

  @Input() showBtnNew: boolean = true

  paginatorData: any = {
    skip: 0,
    limit: 10
  }

  orgData: any = []
  antTableData: any = []
  total: number = 300
  pageSize = 10;
  pageIndex = 1;
  loading: boolean = false
  constructor(
    private $claim: HttpClaimService,
    private $local: LocalStoreService
  ) { }

  // async ngOnInit(): Promise<void> {
  //   try {
  //     this.getData()
  //   } catch (error) {
  //     console.log("🚀 ~ error:", error)
  //   }
  // }
  // async getData() {
  //   console.log(this.paginatorData);

  //   const localStr: any = localStorage.getItem('RGAS_rgas1')
  //   if (localStr) {
  //     this.paginatorData = JSON.parse(localStr)
  //   }
  //   let params: HttpParams = new HttpParams()
  //   params.append('sort', -1)
  //   params = params.set('skip', 0)
  //   params = params.set('limit', 99999999999)
  //   params = params.set('no_status', JSON.stringify(['cancel']))
  //   if (this.paginatorData.filterSelected) {
  //     params.append(this.paginatorData.filterSelected, this.paginatorData.fillSearch)
  //   }
  //   this.loading = true
  //   this.$claim.getRgas1(params.set('len', 'y')).pipe(
  //     delay(1000),
  //     map((item) => {
  //       return item[0].count
  //     }),
  //     catchError((error) => {
  //       console.error('An error occurred:', error);
  //       // You can return an empty array or handle the error in a way that makes sense for your app
  //       return of(0)
  //     })
  //   ).subscribe(
  //     (count: any) => {
  //       console.log("🚀 ~ count:", count)
  //       this.total = count
  //     },
  //     (error) => {
  //       console.error('Subscription error:', error);
  //     }
  //   )
  //   this.$claim.getRgas1(params).pipe(
  //     delay(1),
  //     map((items) => {
  //       items.forEach((item: any) => {
  //         item.moreThan2Month = this.moreThan2Month(item);
  //         item.moreThan15Month = this.moreThan15Month(item);
  //         item.docStatus = 'Pending';
  //         if (item.document) {
  //           if (item.document.apply && item.document.revise && item.document.verify) {
  //             item.docStatus = 'Closed';
  //           }
  //         }
  //         item.claimStatus = item.status;
  //         item.PIC = item.analysisPIC?.name;
  //         item.defect = item.results?.ktcAnalysisResult;
  //         item.lotNo = item.productLotNo;
  //         item.judgment = item.results?.ktcJudgment;
  //         item.claimMonth = moment(item.claimRegisterDate).format('MMM-YY');
  //       });
  //       return items;
  //     }),
  //     catchError((error) => {
  //       console.error('An error occurred:', error);
  //       // You can return an empty array or handle the error in a way that makes sense for your app
  //       return of([]); // Return an empty array as fallback
  //     })
  //   ).subscribe(
  //     (result: any) => {
  //       // this.total=0
  //       this.orgData = []
  //       this.antTableData = []
  //       this.orgData = result
  //       this.antTableData = result;
  //       this.loading = false
  //     },
  //     (error) => {
  //       // Optionally, you can handle errors here as well, but it's better to handle them in catchError
  //       console.error('Subscription error:', error);
  //     }
  //   );


  // }
  // onQueryParamsChange(params: NzTableQueryParams): void {
  //   console.log(params);
  //   const { pageSize, pageIndex, sort, filter } = params;
  //   const currentSort = sort.find(item => item.value !== null);
  //   const sortField = (currentSort && currentSort.key) || null;
  //   const sortOrder = (currentSort && currentSort.value) || null;
  //   this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  // }
  // loadDataFromServer(
  //   pageIndex: number,
  //   pageSize: number,
  //   sortField: string | null,
  //   sortOrder: string | null,
  //   filter: Array<{ key: string; value: string[] }>
  // ): void {
  //   // this.loading = true;
  //   // this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
  //   //   this.loading = false;
  //   //   this.total = 200; // mock the total data here
  //   //   this.listOfRandomUser = data.results;
  //   // });
  //   this.paginatorData.limit = pageSize
  //   this.paginatorData.skip = (pageIndex - 1) * pageSize
  //   this.getData()
  // }
  trackByIndex(_: number, data: any): number {
    return data.index;
  }
  ngOnInit(): void {
    this.getData()
  }
  getData() {
    let params: HttpParams = new HttpParams()
    params.append('sort', -1)
    params = params.set('skip', 0)
    params = params.set('limit', 99999999999)
    params = params.set('no_status', JSON.stringify(['cancel']))
    if (this.paginatorData.filterSelected) {
      params.append(this.paginatorData.filterSelected, this.paginatorData.fillSearch)
    }
    this.$claim.getRgas1(params).pipe(
      delay(1),
      map((items) => {
        items.forEach((item: any, i: number) => {
          item.moreThan2Month = this.moreThan2Month(item);
          item.moreThan15Month = this.moreThan15Month(item);
          item.docStatus = 'Pending';
          if (item.document) {
            if (item.document.apply && item.document.revise && item.document.verify) {
              item.docStatus = 'Closed';
            }
          }
          item.claimStatus = item.status;
          item.PIC = item.analysisPIC?.name;
          item.defect = item.results?.ktcAnalysisResult;
          item.lotNo = item.productLotNo;
          item.judgment = item.results?.ktcJudgment;
          item.claimMonth = moment(item.claimRegisterDate).format('MMM-YY');
          item.index = i
        });
        return items;
      }),
      catchError((error) => {
        console.error('An error occurred:', error);
        // You can return an empty array or handle the error in a way that makes sense for your app
        return of([]); // Return an empty array as fallback
      })
    ).subscribe(
      (result: any) => {
        // this.total=0
        this.orgData = []
        this.antTableData = []
        this.orgData = result
        this.antTableData = result;
        this.loading = false
      },
      (error) => {
        // Optionally, you can handle errors here as well, but it's better to handle them in catchError
        console.error('Subscription error:', error);
      }
    );
  }

  onSearchSelect() {

  }
  async onSearchSubmit() {
    try {
      this.paginatorData.filterSelected = this.filterSelected
      this.paginatorData.fillSearch = this.fillSearch
      this.saveLocalStorage()
      this.getData()

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  saveLocalStorage() {
    localStorage.setItem('RGAS_rgas1', JSON.stringify(this.paginatorData))
  }
  onClickNew() {

  }
  adminValidate() {
    return true
  }
  onClickClaim(row: any) {

  }
  cancelClaim(row: any) {

  }
  cssStatus(status: any) {
    if (status) {
      if (status == "Closed") return 'closed'
      if (status == "Pending") return 'pending'
    }
    return '';
  }
  moreThan2Month(row: any) {
    const finalReport = row.reports?.find((item: any) => item.name == 'finalReport')
    const result = row.results
    if (finalReport?.dateSubmitToCustomer && result?.partReceivingDate) {
      const nextMonth = moment(result.partReceivingDate).add(2, 'month')
      const today = moment(finalReport.dateSubmitToCustomer)
      if (today > nextMonth) {
        return 'More than 2 months'
      }
    }
    return 'Less than 2 months'
  }
  cssStatus1(text: any) {
    if (text == 'More than 2 months') {
      return 'text-red'
    }
    return 'text-green'
  }
  cssStatus2(text: any) {
    if (text == 'More than 1.5 months') {
      return 'text-red'
    }
    return 'text-green'
  }
  moreThan15Month(row: any) {
    const finalReport = row.reports?.find((item: any) => item.name == 'finalReport')
    const result = row.results
    if (finalReport?.dateSubmitToCustomer && result?.partReceivingDate) {
      const nextMonth = moment(result.partReceivingDate).add(1.5, 'month')
      const today = moment(finalReport.dateSubmitToCustomer)
      if (today > nextMonth) {
        return 'More than 1.5 months'
      }
    }
    return 'Less than 1.5 months'
  }
  onFilter2(e: any, key: string) {

  }


}
