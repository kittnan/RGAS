import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as Exceljs from 'exceljs';
import { lastValueFrom } from 'rxjs';
import { HttpM1eService } from 'src/app/https/http-m1e.service';
import { HttpPrincipleService } from 'src/app/https/http-principle.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
@Component({
  selector: 'app-r-principle',
  templateUrl: './r-principle.component.html',
  styleUrls: ['./r-principle.component.scss']
})
export class RPrincipleComponent implements OnInit {



  displayedColumns: string[] = ['No', 'Occurrence cause(Root cause)', 'Outflow cause(Leak cause)', 'Total code'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private $principle: HttpPrincipleService,
    private $alert: SweetAlertGeneralService,
    private $excel: ExcelService
  ) { }

  async ngOnInit(): Promise<void> {
    let params: HttpParams = new HttpParams()
    const resData = await lastValueFrom(this.$principle.get(params))
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
        const resData = await lastValueFrom(this.$principle.import(data))
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
      let resModels = await lastValueFrom(this.$principle.get(new HttpParams()))
      if (resModels.length > 0) {
        this.$excel.export(resModels, 'RGAS_Principle_master')
      }
    } else {
      this.$alert.danger('Password is not correct !!')
    }
  }

}
