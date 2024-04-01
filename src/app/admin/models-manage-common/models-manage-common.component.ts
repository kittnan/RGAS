import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { HttpModelsService } from 'src/app/https/http-models.service';
import * as Exceljs from 'exceljs'
import { HttpModelsCommonService } from 'src/app/https/http-models-common.service';

@Component({
  selector: 'app-models-manage-common',
  templateUrl: './models-manage-common.component.html',
  styleUrls: ['./models-manage-common.component.scss']
})
export class ModelsManageCommonComponent implements OnInit {

  displayedColumns: string[] = ['Group-1', 'Status', 'Size', 'Group-2', 'Model(MDL)', 'Model Code(MDL)', 'Model Name(MDL)', 'Model(PNL)', 'Model Code(PNL)', 'Model Name(PNL)', 'Model(SMT)', 'Model Code(SMT)', 'Model Name(SMT)', 'Project Name', 'Remark'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private $model: HttpModelsCommonService
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
    const file: any = event.target.files[0] as File;
    const wb = new Exceljs.Workbook();
    await wb.xlsx.load(file);
    const ws: Exceljs.Worksheet | undefined = wb.getWorksheet(1);
    const data = await this.excelSheetToObject(ws)
    const resData = await lastValueFrom(this.$model.import(data))
  }
  excelSheetToObject(ws: Exceljs.Worksheet | undefined) {
    return new Promise(resolve => {
      let data: any = [];
      if (ws) {
        let head: any = []
        ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber == 1) {
            head = row.values
            head = head.map((h: any) => h.replaceAll('.', ''))
          } else {
            const rowData: any = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              rowData[`${head[colNumber]}`] = cell.value;
            });
            data.push(rowData);
          }
        });
        resolve(data)
      } else {
        resolve([])
      }
    })
  }
}
