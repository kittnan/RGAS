import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { HttpDefectService } from 'src/app/https/http-defect.service';
import * as Exceljs from 'exceljs'
import { HttpParams } from '@angular/common/http';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { saveAs } from 'file-saver';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-defect-manage',
  templateUrl: './defect-manage.component.html',
  styleUrls: ['./defect-manage.component.scss']
})
export class DefectManageComponent implements OnInit {

  displayedColumns: string[] = ['No', 'Function/Appearance', 'Defect phenomenon(Major classification)', 'Detailed phenomenon(Middle classification)', 'Cause(Minor classfication)', 'Defect code'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  rowsLength: number = 0
  constructor(
    private $defect: HttpDefectService,
    private $alert: SweetAlertGeneralService,
    private $excel: ExcelService
  ) { }

  async ngOnInit(): Promise<void> {
    let tableParam: HttpParams = new HttpParams()
    tableParam = tableParam.set('page', 1)
    tableParam = tableParam.set('limit', 10)
    const resData = await lastValueFrom(this.$defect.table(tableParam))
    this.dataSource = new MatTableDataSource(resData.data.map((item: any, index: number) => {
      return {
        ...item,
        No: index + 1
      }
    }))
    this.rowsLength = resData.count[0].rows
    setTimeout(() => {
      this.paginator.pageSizeOptions.push(this.rowsLength)
    }, 300);
  }

  async onPageChange(e: any) {
    let tableParam: HttpParams = new HttpParams()
    tableParam = tableParam.set('page', e.pageIndex)
    tableParam = tableParam.set('limit', e.pageSize)
    const resData = await lastValueFrom(this.$defect.table(tableParam))
    this.dataSource = new MatTableDataSource(resData.data.map((item: any, index: number) => {
      return {
        ...item,
        No: (index + 1) + (e.pageIndex * e.pageSize)
      }
    }));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  async onUpload(event: any) {
    try {
      let password = prompt("Please enter your password:");

      const file: any = event.target?.files[0] as File;
      if (file && password == 'admin@1800') {
        const wb = new Exceljs.Workbook();
        await wb.xlsx.load(file);
        const ws: Exceljs.Worksheet | undefined = wb.getWorksheet(1);
        const data = await this.$excel.excelSheetToObject(ws)
        const resData = await lastValueFrom(this.$defect.import(data))
        this.$alert.success(true)

      } else {
        this.$alert.danger('Not found file or password is not correct !!')

      }
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }

  }

  async onDownload() {
    let password = prompt("Please enter your password:");
    if (password == 'admin@1800') {

      let resModels = await lastValueFrom(this.$defect.get(new HttpParams()))
      if (resModels.length > 0) {
        this.$excel.export(resModels, 'RGAS_defect_master')
      }
    } else {
      this.$alert.danger('Password is not correct !!')
    }
  }
}
