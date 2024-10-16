import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import Swal, { SweetAlertResult } from 'sweetalert2';


interface FILTER_OPTION {
  value: string,
  name: string
}

@Component({
  selector: 'app-rgas1',
  templateUrl: './rgas1.component.html',
  styleUrls: ['./rgas1.component.scss']
})
export class Rgas1Component implements OnInit {

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

  displayedColumns: string[] = ['registerNo', 'no', 'docStatus', 'status1', 'status2', 'PIC', 'claimMonth', 'claimNo', 'modelNo', 'customerName', 'occurredLocation', 'defect', 'qty', 'lotNo', 'judgment', 'returnStyle'];
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
  constructor(
    private $claim: HttpClaimService,
    private $local: LocalStoreService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.getData()
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  async getData(sort: number = -1, skip: number = 0, limit: number = 10) {
    try {
      this.isLoading = true
      const localStr: any = localStorage.getItem('RGAS_rgas1')
      if (localStr) {
        this.paginatorData = JSON.parse(localStr)
      }
      let params: HttpParams = new HttpParams()
      params = params.set('sort', sort)
      params = params.set('skip', this.paginatorData.skip)
      params = params.set('limit', this.paginatorData.limit)
      params = params.set('no_status', JSON.stringify(['cancel']))
      if (this.paginatorData.filterSelected) {
        params = params.set(this.paginatorData.filterSelected, this.paginatorData.fillSearch)
      }
      let len = await lastValueFrom(this.$claim.getRgas1(params.set('len', 'y')))
      let resClaims = await lastValueFrom(this.$claim.getRgas1(params.delete('len')))
      this.dataSource = new MatTableDataSource(resClaims.map((item: any, i: number) => {
        let docStatus = 'Pending'
        let document = item.document
        if (document) {
          if (document.apply && document.revise && document.verify) {
            docStatus = 'Closed'
          }
        }
        item.docStatus = docStatus
        item.claimStatus = item.status
        item.PIC = item.analysisPIC?.name
        item.defect = item.results?.ktcAnalysisResult
        item.lotNo = item.productLotNo
        item.judgment = item.results?.ktcJudgment
        item.claimMonth = moment(item.claimRegisterDate).format('MMM-YY')
        return item
      }))
      if (this.dataSource) {
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          if (len && len.length > 0) {
            const count = len[0]['count']
            this.itemCount = count
          }

          setTimeout(() => {
            this.paginator.pageIndex = this.paginatorData?.pageIndex ? this.paginatorData?.pageIndex : 0
            this.paginator.pageSize = this.paginatorData?.pageSize ? this.paginatorData?.pageSize : 10
            this.paginator.pageSizeOptions = this.paginator.pageSizeOptions.sort((a: any, b: any) => a - b)
            this.filterSelected = this.paginatorData.filterSelected
            this.fillSearch = this.paginatorData.fillSearch

            let div: any = document.querySelector('.mat-table-custom')
            if (div) {
              div.scrollTop = this.paginatorData.scrollTop
              div.scrollLeft = this.paginatorData.scrollLeft
            }
          }, 0);

          this.isLoading = false;
        }, 0);
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  async onPageChange(e: any) {
    let skip = e.pageIndex * e.pageSize
    this.paginatorData.skip = skip
    this.paginatorData.limit = e.pageSize
    this.paginatorData.pageSize = e.pageSize
    this.paginatorData.pageIndex = e.pageIndex
    this.saveLocalStorage()
    this.getData(-1)
  }


  // todo onSearchSelect
  onSearchSelect() {
    this.fillSearch = ''
    if (this.filterSelected == 'claimMonth') {
      this.placeholder = 'MM-YYYY -> 02-2024'
    }
  }

  // todo search by option
  async onSearchSubmit() {
    try {
      this.paginatorData.skip = 0
      this.paginatorData.limit = 10
      this.paginatorData.pageSize = 10
      this.paginatorData.pageIndex = 0
      this.paginatorData.filterSelected = this.filterSelected
      this.paginatorData.fillSearch = this.fillSearch
      this.saveLocalStorage()
      this.getData()

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo save local
  saveLocalStorage() {
    localStorage.setItem('RGAS_rgas1', JSON.stringify(this.paginatorData))
  }

  // todo search table
  applyFilter(event: Event, column: string): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // this.filterValues[column] = filterValue;
    // this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  // todo click new claim
  onClickNew() {
    this.onClickNewChange.emit()
  }

  // todo click claim
  onClickClaim(row: any) {
    let div: any = document.querySelector('.mat-table-custom')
    if (div) {
      this.paginatorData.scrollTop = div.scrollTop
      this.paginatorData.scrollLeft = div.scrollLeft
      this.saveLocalStorage()
    }
    this.onClickClaimChange.emit(row)
  }

  // todo class form status
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

  adminValidate() {
    if (this.$local.getAuth() == 'admin') {
      return true
    }
    return false
  }

  // todo cancel claim
  cancelClaim(row: any) {
    Swal.fire({
      title: `Do you want to delete register no ${row.registerNo}`,
      text: `claim ${row.claimNo}`,
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.onClaimChange.emit(row)
      }
    })
  }

}
