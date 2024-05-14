import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as Exceljs from 'exceljs';
import { lastValueFrom } from 'rxjs';
import { HttpMailService } from 'src/app/https/http-mail.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'email'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private $mail: HttpMailService
  ) { }

  async ngOnInit(): Promise<void> {
    const resData = await lastValueFrom(this.$mail.getDearAll())
    this.dataSource = new MatTableDataSource(resData.map((item: any, i: number) => {
      item.no = i + 1
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
    const resData = await lastValueFrom(this.$mail.saveDearAll(data));
    Swal.fire({
      title:'success',
      icon: 'success',
      showConfirmButton:false,
      timer:1500
    }).then(() =>{
      location.reload()
    })
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

  onDownload() {
    try {
      let data: any = this.dataSource.data
      const workbook = new Exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Sheet1');
      worksheet.addRow(['no', 'name', 'email']);
      data.forEach((row: any) => {
        let values = [row.no, row.name, row.email]
        worksheet.addRow(values);
      });
      // Generate Excel file
      workbook.xlsx.writeBuffer()
        .then(buffer => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);

          // Create a link element and trigger download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'email-list.xlsx';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(err => {
          console.error('Error:', err);
        });
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}
