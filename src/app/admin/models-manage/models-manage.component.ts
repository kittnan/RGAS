import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as Exceljs from 'exceljs'
import { saveAs } from 'file-saver';
import { lastValueFrom } from 'rxjs';
import { HttpModelsService } from 'src/app/https/http-models.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
@Component({
  selector: 'app-models-manage',
  templateUrl: './models-manage.component.html',
  styleUrls: ['./models-manage.component.scss']
})
export class ModelsManageComponent implements OnInit {
  displayedColumns: string[] = ['No', 'Model', 'KYD Cd', 'Model Name', 'Biz Segment', 'Process', 'Customer', 'Classification', 'Project Name'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private $model: HttpModelsService,
    private $alert: SweetAlertGeneralService,
    private $excel: ExcelService
  ) { }

  async ngOnInit(): Promise<void> {
    let params: HttpParams = new HttpParams()
    const resData = await lastValueFrom(this.$model.get(params))
    this.dataSource = new MatTableDataSource(resData)
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
        const resData = await lastValueFrom(this.$model.import(data))
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
      let resModels = await lastValueFrom(this.$model.get(new HttpParams()))
      if (resModels.length > 0) {
        this.$excel.export(resModels, 'RGAS_models_master')
      }
    } else {
      this.$alert.danger('Password is not correct !!')
    }
  }
}
