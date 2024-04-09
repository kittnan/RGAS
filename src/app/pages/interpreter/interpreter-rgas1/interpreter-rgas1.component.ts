import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interpreter-rgas1',
  templateUrl: './interpreter-rgas1.component.html',
  styleUrls: ['./interpreter-rgas1.component.scss']
})
export class InterpreterRgas1Component implements OnInit {

  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  onClickNewChange() {
    this.router.navigate(['operator/new'])
  }
  // todo click row
  onClickClaimChange($event: any) {
    if ($event.claimStatus == 'analysis') {
      this.router.navigate(['interpreter/analysis'], {
        queryParams: {
          registerNo: $event.registerNo,
          no: $event.no

        }
      })
    }
  }

}
