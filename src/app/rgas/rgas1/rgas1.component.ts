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

  displayedColumns: string[] = ['registerNo', 'no', 'docStatus', 'PIC', 'claimMonth', 'claimNo', 'modelNo', 'customerName', 'occurredLocation', 'defect', 'qty', 'lotNo', 'judgment', 'returnStyle'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  claims: any[] = []
  @Output() onClickClaimChange: EventEmitter<any> = new EventEmitter()
  @Output() onClickNewChange: EventEmitter<any> = new EventEmitter()

  @Input() showBtnNew: boolean = true
  constructor(
    private $claim: HttpClaimService,
    private $local: LocalStoreService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let params: HttpParams = new HttpParams()
      // params = new HttpParams().set('status', JSON.stringify(['receive information', 'wait approve', 'analysis']))
      let resClaims = await lastValueFrom(this.$claim.getRgas1(params))
      this.dataSource = new MatTableDataSource(resClaims.map((item: any, i: number) => {
        let docStatus = 'Pending'
        let document = item.document
        if (document) {
          if (document.apply == 'Need' && document.revise == 'Need' && document.verify == 'Need') {
            docStatus = 'Closed'
          }
        }
        item.docStatus = docStatus
        return item
      }))
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 300);
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
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
      if (this.filterSelected && this.fillSearch) {
        let params: HttpParams = new HttpParams()
        params = new HttpParams().set('status', JSON.stringify(['receive information', 'wait approve', 'analysis']))
        params = params.set(this.filterSelected, this.fillSearch)
        const resData = await lastValueFrom(this.$claim.getRgas1(params))
        this.dataSource = new MatTableDataSource(resData)
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 300);
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo search table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // todo click new claim
  onClickNew() {
    this.onClickNewChange.emit()
    // this.router.navigateByUrl("operator/rgas2")
  }

  // todo click claim
  onClickClaim(row: any) {
    this.onClickClaimChange.emit(row)
  }

  // todo class form status
  cssStatus(status: any) {
    if (status) {
      if (status == "Closed") return 'closed'
      if (status == "Pending") return 'pending'
    }
    // if (status) {
    //   if (status == "receive information") return 'receive'
    //   if (status == "wait approve") return 'waitApprove'
    //   if (status == "analysis") return 'analysis'
    // }
    return '';
  }


}
