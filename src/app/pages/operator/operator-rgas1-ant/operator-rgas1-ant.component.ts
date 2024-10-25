import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operator-rgas1-ant',
  templateUrl: './operator-rgas1-ant.component.html',
  styleUrls: ['./operator-rgas1-ant.component.scss']
})
export class OperatorRgas1AntComponent implements OnInit {


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
    if (event.claimStatus == 'receive information') {
      this.router.navigate(['operator/information'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no
        }
      })
    }
    if (event.claimStatus == 'wait approve') {
      this.router.navigate(['operator/information'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no
        }
      })
    }
    if (event.claimStatus == 'analysis') {
      this.router.navigate(['engineer/analysis'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no

        }
      })
    }
    if (event.claimStatus == 'finish') {
      this.router.navigate(['engineer/analysis'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no

        }
      })
    }
  }
}
