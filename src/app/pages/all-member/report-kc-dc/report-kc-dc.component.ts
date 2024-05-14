import { Component, Input, OnInit } from '@angular/core';
import { ExportKcDcService } from './export-kc-dc.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { lastValueFrom } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-report-kc-dc',
  templateUrl: './report-kc-dc.component.html',
  styleUrls: ['./report-kc-dc.component.scss']
})
export class ReportKcDcComponent implements OnInit {

  displayedColumns: string[] = ['select', 'registerNo', 'no', 'docStatus', 'PIC', 'claimMonth', 'claimNo', 'modelNo', 'customerName', 'occurredLocation', 'defect', 'qty', 'lotNo', 'judgment', 'returnStyle'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  date: any = {
    start: moment(),
    end: moment()
  }

  constructor(
    private $exportKC_DC: ExportKcDcService,
    private $claim: HttpClaimService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let params: HttpParams = new HttpParams()
      params = params.set('start', moment(this.date.start).format('DD-MM-YY'))
      params = params.set('end', moment(this.date.end).format('DD-MM-YY'))
      this.getData(params)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onSubmit() {
    try {
      let params: HttpParams = new HttpParams()
      if (this.date?.start) {
        params = params.set('start', moment(this.date.start).format('DD-MM-YY'))
      }
      if (this.date?.end) {
        params = params.set('end', moment(this.date.end).format('DD-MM-YY'))
      }
      this.getData(params)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  async getData(params: HttpParams) {
    let resClaims = await lastValueFrom(this.$claim.getClaimData(params))
    this.dataSource = new MatTableDataSource(resClaims.map((item: any, i: number) => {
      let docStatus = 'Pending'
      let document = item.document
      if (document) {
        if (document.apply == 'Need' && document.revise == 'Need' && document.verify == 'Need') {
          docStatus = 'Closed'
        }
      }
      item.docStatus = docStatus
      item.PIC = item.analysisPIC?.name ? item.analysisPIC?.name : ''
      item.claimMonth = item.claimRegisterDate ? moment(item.claimRegisterDate).format('MM-YY') : ""
      item.defect = item.results?.ktcAnalysisResult ? item.results?.ktcAnalysisResult : ''
      item.lotNo = item.productLotNo
      item.judgment = item.results?.ktcJudgment
      return item
    }))
  }
  onExportKC_DC() {
    try {
      this.$exportKC_DC.export(this.selection.selected, this.date)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  // todo class form status
  cssStatus(status: any) {
    if (status) {
      if (status == "Closed") return 'closed'
      if (status == "Pending") return 'pending'
    }
    return '';
  }

  // todo click claim
  onClickClaim(row: any) {
    console.log("🚀 ~ row:", row)
    // this.onClickClaimChange.emit(row)
  }

}
