import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { LocalStoreService } from 'src/app/services/local-store.service';



@Component({
  selector: 'app-rgas1',
  templateUrl: './rgas1.component.html',
  styleUrls: ['./rgas1.component.scss']
})
export class Rgas1Component implements OnInit {
  filterOption: string[] = [
    'claimNo',
    'PIC',
    'modelNo',
    'modelName',
    'claimMonth',
    'defect',
    'customerName',
    'judgment'
  ]
  filterSelected: string = ''
  fillSearch: string = ''

  displayedColumns: string[] = ['registerNo', 'claimStatus', 'PIC', 'claimMonth', 'claimNo', 'modelNo', 'customerName', 'defect', 'qty', 'lotNo', 'judgment'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  claims: any[] = []
  @Output() onClickClaimChange: EventEmitter<any> = new EventEmitter()
  @Output() onClickNewChange: EventEmitter<any> = new EventEmitter()
  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private $local: LocalStoreService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let params: HttpParams = new HttpParams()
      this.claims = await lastValueFrom(this.$claim.get(params))
      console.log("🚀 ~ this.claims:", this.claims)
      this.dataSource = new MatTableDataSource(this.claims.map((claim: any) => {
        return {
          ...claim,
          'registerNo': claim.registerNo,
          'claimStatus': claim.status,
          'PIC': claim.analysisPIC ? `${claim.analysisPIC?.firstName}-${claim.analysisPIC?.lastName[0]}`:'',
          'claimMonth': moment(claim.dueDate).format('YYYY-MMM-DD'),
          'claimNo': claim.claimNo,
          'modelNo': claim.modelNo,
          'customerName': claim.customerName,
          'defect': null,
          'qty': claim.qty,
          'lotNo': claim.productLotNo,
          'judgment': null
        }
      }))
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 300);
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  // todo search by option
  onSearchSubmit() {
    console.log(this.fillSearch);
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
    console.log("🚀 ~ row:", row)
    this.onClickClaimChange.emit(row)
  }


}
