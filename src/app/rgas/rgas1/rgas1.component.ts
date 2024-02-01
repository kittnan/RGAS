import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';



@Component({
  selector: 'app-rgas1',
  templateUrl: './rgas1.component.html',
  styleUrls: ['./rgas1.component.scss']
})
export class Rgas1Component implements OnInit {





  filterOption: string[] = [
    'claimNo',
    'PIC',
    'modelNo',
    'modelName',
    'claimMonth',
    'defect',
    'customerName',
    'judgment'
  ]
  filterSelected: string = ''
  fillSearch: string = ''

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // todo search by option
  onSearchSubmit() {
    console.log(this.fillSearch);
  }

  // todo search table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // todo click new claim
  onClickNew() {
    this.router.navigateByUrl("operator/rgas2")
  }
}
