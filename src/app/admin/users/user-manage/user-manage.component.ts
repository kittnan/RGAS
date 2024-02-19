import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/https/http-users.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  displayedColumns: string[] = ['employeeCode', 'firstName', 'lastName', 'email', 'access', 'active'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
    this.router.navigate(['users/new'])
  }

  onChangeSlide(event: any, element: any) {
    let checked = event.checked
    element.status = checked
    // await lastValueFrom(this.$masters.update([element]))
    // Swal.fire(`Changed data`);
  }

}
