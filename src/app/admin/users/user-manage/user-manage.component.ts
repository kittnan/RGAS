import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/https/http-users.service';
import * as ExcelJS from 'exceljs';
import * as moment from 'moment';
@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  displayedColumns: string[] = ['employeeCode', 'name', 'email', 'access', 'active'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('fileUpload', { static: true }) fileUpload!: ElementRef;

  constructor(
    private router: Router,
    private $user: HttpUsersService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const resData = await lastValueFrom(this.$user.get(new HttpParams()))
      this.dataSource = new MatTableDataSource(resData.map((item: any) => {
        return {
          ...item
        }
      }))
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 300);
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  onClickAddNewUser() {
    console.log('3456789');
    this.router.navigate(['admin/users-new'])
  }

  onChangeSlide(event: any, element: any) {
    let checked = event.checked
    element.status = checked
    // await lastValueFrom(this.$masters.update([element]))
    // Swal.fire(`Changed data`);
  }

  async onUpload(event: any) {
    try {
      let file = event.target.files[0]
      if (file) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const worksheet: ExcelJS.Worksheet | undefined = workbook.getWorksheet(1);
        if (worksheet) {
          const jsonData: any = [];
          const headerRow = worksheet.getRow(1);
          for (let i = 2; i <= worksheet.rowCount; i++) {
            const rowData: any = {};
            worksheet.getRow(i).eachCell({ includeEmpty: true }, function (cell, colNumber) {
              const header: any = headerRow.getCell(colNumber).value;
              if (header == 'email') {
                if (typeof cell.value == 'object') {
                  let value: any = cell.value
                  rowData[header] = value.text;
                } else {
                  rowData[header] = cell.value;

                }
              } else {
                rowData[header] = cell.value;
              }
            });
            let access = []
            for (const key in rowData) {
              if (key.includes('access')) {
                if (rowData[key])
                  access.push(rowData[key])
              }
            }
            rowData.access = access
            jsonData.push(rowData);
          }
          await lastValueFrom(this.$user.import(jsonData))
          setTimeout(() => {
            location.reload()
          }, 300);

        }
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}
