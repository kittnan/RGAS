import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { HttpDefectService } from 'src/app/https/http-defect.service';
import * as Exceljs from 'exceljs'

@Component({
  selector: 'app-defect-manage',
  templateUrl: './defect-manage.component.html',
  styleUrls: ['./defect-manage.component.scss']
})
export class DefectManageComponent implements OnInit {

  displayedColumns: string[] = ['No', 'Function/Appearance', 'Defect phenomenon(Major classification)', 'Detailed phenomenon(Middle classification)', 'Cause(Minor classfication)', 'Defect code'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private $defect: HttpDefectService
  ) { }

  async ngOnInit(): Promise<void> {
    const resData = await lastValueFrom(this.$defect.get())
    this.dataSource = new MatTableDataSource(resData.map((item:any,index:number)=>{
      return {
        ...item,
        No:index+1
      }
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
    const resData = await lastValueFrom(this.$defect.import(data))
    console.log("🚀 ~ resData:", resData)
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
