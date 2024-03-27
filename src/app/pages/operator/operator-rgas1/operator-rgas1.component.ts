import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operator-rgas1',
  templateUrl: './operator-rgas1.component.html',
  styleUrls: ['./operator-rgas1.component.scss']
})
export class OperatorRgas1Component implements OnInit {

  claim: any = null
  constructor(
    private router: Router,
  ) {


  }

  ngOnInit(): void {
  }
  onClickNewChange() {
    this.router.navigate(['operator/new'])
  }

  // todo click row
  onClickClaimChange(event: any) {
    if (event.status == 'receive information') {
      this.router.navigate(['operator/information'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no
        }
      })
    }
    if (event.status == 'wait approve') {
      this.router.navigate(['operator/information'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no
        }
      })
    }
    if (event.status == 'analysis') {
      this.router.navigate(['operator/analysis'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no

        }
      })
    }
  }

}
