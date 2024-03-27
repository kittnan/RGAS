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

  displayedColumns: string[] = ['registerNo', 'no', 'claimStatus', 'PIC', 'claimMonth', 'claimNo', 'modelNo', 'customerName', 'occurredLocation', 'defect', 'qty', 'lotNo', 'judgment'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  claims: any[] = []
  @Output() onClickClaimChange: EventEmitter<any> = new EventEmitter()
  @Output() onClickNewChange: EventEmitter<any> = new EventEmitter()
  constructor(
    private $claim: HttpClaimService,
    private $local: LocalStoreService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let params: HttpParams = new HttpParams()
      this.claims = await lastValueFrom(this.$claim.getRgas1(params))
      this.dataSource = new MatTableDataSource(this.claims.map((claim: any) => {
        return {
          ...claim,
          'registerNo': claim.registerNo,
          'no': claim.no,
          'claimStatus': claim.status,
          'PIC': claim.analysisPIC ? `${claim.analysisPIC?.name}` : '',
          'claimMonth': moment(claim.dueDate).format('DD-MMM-YYYY'),
          'claimNo': claim.claimNo,
          'modelNo': claim.modelNo,
          'customerName': claim.customerName,
          'occurredLocation': claim.occurredLocation,
          'defect': claim.descriptionENG,
          'qty': claim.qty,
          'lotNo': claim.productLotNo,
          'judgment': claim.result?.ktcJudgment ? claim.result?.ktcJudgment : ''
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


}
