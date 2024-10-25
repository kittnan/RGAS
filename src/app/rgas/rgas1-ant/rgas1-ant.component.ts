import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import moment from 'moment';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { catchError, delay, map, of } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
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

  listOfData: any[] = [];

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
  placeholder: string = 'Value'

  @Output() onClickClaimChange: EventEmitter<any> = new EventEmitter()
  @Output() onClickNewChange: EventEmitter<any> = new EventEmitter()
  @Output() onClaimChange: EventEmitter<any> = new EventEmitter()
  @Input() showBtnNew: boolean = true


  //  ! define --------------------------------
  paginatorData = {
    skip: 0,
    filterSelected: '',
    fillSearch: '',
    pageIndex: 1,
    pageSize: 10,
    scrollTop: 0,
    scrollLeft: 0
  }
  pageSizeOption: number[] = [10, 20, 50, 100]
  refPageSizeOption: number[] = [10, 20, 50, 100]
  antTableData: readonly any[] = []
  total: number = 0
  pageSize = 10;
  pageIndex = 1;
  loading: boolean = false
  filterHeaders: any[] = []
  sortHeaders: any[] = []

  tempFilterDate: any
  // @ViewChild('tableBody', { static: true }) nzTable!: ElementRef;
  @ViewChild('nzTable', { static: false }) nzTable?: ElementRef<any>;
  scrollPosition = 0;
  constructor(
    private $claim: HttpClaimService,
    private $local: LocalStoreService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const localStr: any = localStorage.getItem('RGAS_rgas1_ant')
      if (localStr) {
        this.paginatorData = JSON.parse(localStr)
      }
      const localStr2: any = localStorage.getItem('RGAS_rgas1_ant_filterHeaders')
      if (localStr2) {
        this.filterHeaders = JSON.parse(localStr2)

      }
      const localStr3: any = localStorage.getItem('RGAS_rgas1_ant_sortHeaders')
      if (localStr3) {
        this.sortHeaders = JSON.parse(localStr3)
      }
      this.getTotal2()
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      let div: any = document.querySelector('.ant-table-body')
      if (div) {
        div.scrollTo({
          top: this.paginatorData.scrollTop,
          left: this.paginatorData.scrollLeft,
          behavior: 'smooth' // เพิ่มความนุ่มนวลในการเลื่อน
        });
      }
      this.filterHeaders.forEach((a: any) => {
        let divFilter: any = document.querySelector(`#filter-${a.key}`)
        if (divFilter) {
          if (a.key == 'claimMonth') {
            this.tempFilterDate = moment(a.value, 'MMM-YY').toDate()
          } else {
            divFilter.value = a.value
          }
        }
      });

    }, 1000);

  }
  // ! -----------------------------------------------------------------------------------------------------------------
  onChangeSelect() {
    this.paginatorData.fillSearch = ''
  }
  async onSearchSubmit() {
    try {
      this.saveLocalStorage()
      this.getTotal2()
      this.getData2(this.paginatorData.skip, this.paginatorData.pageSize)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  saveLocalStorage() {
    localStorage.setItem('RGAS_rgas1_ant', JSON.stringify(this.paginatorData))
    localStorage.setItem('RGAS_rgas1_ant_filterHeaders', JSON.stringify(this.filterHeaders))
    localStorage.setItem('RGAS_rgas1_ant_sortHeaders', JSON.stringify(this.sortHeaders))
  }
  clearFilter() {
    this.filterHeaders = []
    this.tempFilterDate = null
    localStorage.removeItem('RGAS_rgas1_ant')
    localStorage.removeItem('RGAS_rgas1_ant_filterHeaders')
    localStorage.removeItem('RGAS_rgas1_ant_sortHeaders')
    this.paginatorData = {
      fillSearch: '',
      filterSelected: '',
      pageIndex: 1,
      pageSize: 10,
      skip: 0,
      scrollTop: 0,
      scrollLeft: 0
    }
    this.sortHeaders = [
      {
        key: 'registerNo',
        value: -1
      }
    ]
    this.saveLocalStorage()
    location.reload()
    // this.getTotal2()
    // this.getData2(this.paginatorData.skip, this.paginatorData.pageSize)
  }
  clearFilter2() {
    localStorage.removeItem('RGAS_rgas1_ant_filterHeaders')
    localStorage.removeItem('RGAS_rgas1_ant_sortHeaders')
    this.filterHeaders.forEach((a: any) => {
      let divFilter: any = document.querySelector(`#filter-${a.key}`)
      if (divFilter) {
        divFilter.value = ''
      }
    });
    this.filterHeaders = []
    this.sortHeaders = []
    this.tempFilterDate = null
    this.paginatorData = {
      fillSearch: '',
      filterSelected: '',
      pageIndex: 1,
      pageSize: 10,
      skip: 0,
      scrollTop: 0,
      scrollLeft: 0
    }
    this.sortHeaders = [
      {
        key: 'registerNo',
        value: -1
      }
    ]
    this.saveLocalStorage()
    this.getTotal2()
    this.getData2(this.paginatorData.skip, this.paginatorData.pageSize)
  }
  // todo click new claim
  onClickNew() {
    this.onClickNewChange.emit()
  }

  adminValidate() {
    if (this.$local.getAuth() == 'admin') {
      return true
    }
    return false
  }
  onClickClaim(row: any) {
    let div: any = document.querySelector('.ant-table-body')
    if (div) {
      this.paginatorData.scrollTop = div.scrollTop
      this.paginatorData.scrollLeft = div.scrollLeft
      this.saveLocalStorage()
    }
    this.onClickClaimChange.emit(row)
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
    if (key == 'claimMonth') {
      if (this.tempFilterDate) {
        if (this.filterHeaders.some((value: any) => value.key == key)) {
          const item = this.filterHeaders.find((value: any) => value.key == key)
          item.value = moment(this.tempFilterDate).format('MMM-YY')
        } else {
          this.filterHeaders.push({
            key: key,
            value: moment(this.tempFilterDate).format('MMM-YY')
          })
        }
      } else {
        this.filterHeaders = this.filterHeaders.filter((value: any) => value.key != key)
      }

    } else {
      if (e.target.value?.trim()) {
        if (this.filterHeaders.some((value: any) => value.key == key)) {
          const item = this.filterHeaders.find((value: any) => value.key == key)
          item.value = e.target.value
        } else {
          this.filterHeaders.push({
            key: key,
            value: e.target.value
          })
        }
      } else {
        this.filterHeaders = this.filterHeaders.filter((value: any) => value.key != key)
      }
    }
    this.saveLocalStorage()
    this.confirm()
  }
  confirm() {
    this.getTotal2()
    this.getData2(this.paginatorData.skip, this.paginatorData.pageSize)
  }
  getTotal2() {
    let params: HttpParams = new HttpParams()
    params = params.set('sort', -1)
    params = params.set('skip', this.paginatorData.skip)
    params = params.set('limit', this.paginatorData.pageSize)
    params = params.set('no_status', JSON.stringify(['cancel']))
    if (this.paginatorData.filterSelected) {
      params = params.set(this.paginatorData.filterSelected, this.paginatorData.fillSearch)
    }
    params = params.set('filterHeaders', JSON.stringify(this.filterHeaders))
    params = params.set('sortHeaders', JSON.stringify(this.sortHeaders))

    this.$claim.getRgas1_new(params.set('len', 'y')).pipe(
      delay(1),
      map((item) => {
        if (item?.length != 0) {
          return item[0].count
        }
        return 0
      }),
      catchError((error) => {
        console.error('An error occurred:', error);
        // You can return an empty array or handle the error in a way that makes sense for your app
        return of(0)
      })
    ).subscribe(
      (count: any) => {
        this.total = count
        this.pageSizeOption = []
        this.pageSizeOption = [...this.refPageSizeOption]
        this.pageSizeOption = this.pageSizeOption.filter((a: any) => a < count)
        this.pageSizeOption.push(count)
        this.pageSizeOption = this.pageSizeOption.sort((a: number, b: number) => a - b)

      },
      (error) => {
        console.error('Subscription error:', error);
      }
    )
  }

  async getData2(skip: number, limit: number) {


    let params: HttpParams = new HttpParams()
    params = params.set('sort', -1)
    params = params.set('skip', skip)
    params = params.set('limit', limit)
    params = params.set('no_status', JSON.stringify(['cancel']))
    if (this.paginatorData.filterSelected) {
      params = params.set(this.paginatorData.filterSelected, this.paginatorData.fillSearch)
    }
    params = params.set('filterHeaders', JSON.stringify(this.filterHeaders))
    params = params.set('sortHeaders', JSON.stringify(this.sortHeaders))
    this.$claim.getRgas1_new(params).pipe(
      delay(1),
      map((items) => {
        items.forEach((item: any) => {
          item.moreThan2Month = this.moreThan2Month(item);
          item.moreThan15Month = this.moreThan15Month(item);
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
        this.loading = false
        this.antTableData = result
      },
      (error) => {
        // Optionally, you can handle errors here as well, but it's better to handle them in catchError
        console.error('Subscription error:', error);
      }
    );
  }
  onQueryParamsChange2(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer2(pageIndex, pageSize, sortField, sortOrder, filter);
  }
  loadDataFromServer2(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    const skip = Math.abs((pageIndex - 1) * pageSize)
    this.paginatorData.pageSize = pageSize
    this.paginatorData.skip = skip
    this.getData2(this.paginatorData.skip, this.paginatorData.pageSize)
  }
  cssHeaderFilterActive(key: string) {
    if (this.filterHeaders.some((value: any) => value.key == key)) return 'header-text-active'
    return ''
  }
  handleSort(key: string) {
    let item = this.sortHeaders.find((a: any) => a.key == key)
    if (item && item.value == -1) {
      item.value = 1
    } else if (item && item.value == 1) {
      item.value = null
    } else {
      this.sortHeaders.push({
        key: key,
        value: -1
      })
    }
    this.sortHeaders = this.sortHeaders.filter((item: any) => item.value)
    this.confirm()
  }
  controlSort(key: string) {
    let item = this.sortHeaders.find((a: any) => a.key == key)
    if (item && item.value == -1) return 'arrow_downward'
    if (item && item.value == 1) return 'arrow_upward'
    return ''
  }
}
