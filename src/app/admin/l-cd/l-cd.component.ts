import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { HttpDCdService } from 'src/app/https/http-d-cd.service';
import * as Exceljs from 'exceljs'
import { HttpLCdService } from 'src/app/https/http-l-cd.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-l-cd',
  templateUrl: './l-cd.component.html',
  styleUrls: ['./l-cd.component.scss']
})
export class LCdComponent implements OnInit {


  displayedColumns: string[] = ['No', 'Occurrence process category', 'Occurrence process category details', 'Occurrence process CD'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private $l_cd: HttpLCdService,
    private $alert: SweetAlertGeneralService,
    private $excel: ExcelService
  ) { }

  async ngOnInit(): Promise<void> {
    let params: HttpParams = new HttpParams()
    const resData = await lastValueFrom(this.$l_cd.get(params))
    this.dataSource = new MatTableDataSource(resData.map((item: any, i: number) => {
      item.No = i + 1
      return item
    }))
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 300);
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
        const resData = await lastValueFrom(this.$l_cd.import(data))
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
      let resModels = await lastValueFrom(this.$l_cd.get(new HttpParams()))
      if (resModels.length > 0) {
        this.$excel.export(resModels, 'RGAS_L_CD_master')
      }
    } else {
      this.$alert.danger('Password is not correct !!')
    }
  }
}
