import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { HttpDCdService } from 'src/app/https/http-d-cd.service';
import * as Exceljs from 'exceljs'
import { HttpLCdService } from 'src/app/https/http-l-cd.service';

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
    private $l_cd: HttpLCdService
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
    const file: any = event.target.files[0] as File;
    const wb = new Exceljs.Workbook();
    await wb.xlsx.load(file);
    const ws: Exceljs.Worksheet | undefined = wb.getWorksheet(1);
    const data = await this.excelSheetToObject(ws)
    const resData = await lastValueFrom(this.$l_cd.import(data))
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
