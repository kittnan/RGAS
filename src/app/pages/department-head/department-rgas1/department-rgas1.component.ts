import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-rgas1',
  templateUrl: './department-rgas1.component.html',
  styleUrls: ['./department-rgas1.component.scss']
})
export class DepartmentRgas1Component implements OnInit {

  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {
  }


  // todo click row
  onClickClaimChange($event: any) {
    if ($event.claimStatus == 'analysis') {
      this.router.navigate(['departmentHead/analysis'], {
        queryParams: {
          registerNo: $event.registerNo,
          no: $event.no

        }
      })
    }
  }

}
