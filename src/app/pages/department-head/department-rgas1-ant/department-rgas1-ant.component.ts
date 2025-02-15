import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-rgas1-ant',
  templateUrl: './department-rgas1-ant.component.html',
  styleUrls: ['./department-rgas1-ant.component.scss']
})
export class DepartmentRgas1AntComponent implements OnInit {


  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {
  }


  // todo click row
  onClickClaimChange(event: any) {
    // if (event.claimStatus == 'receive information') {
    //   this.router.navigate(['operator/information'], {
    //     queryParams: {
    //       registerNo: event.registerNo,
    //       no: event.no
    //     }
    //   })
    // }
    // if (event.claimStatus == 'wait approve') {
    //   this.router.navigate(['engineer/approve-claim'], {
    //     queryParams: {
    //       registerNo: event.registerNo,
    //       no: event.no
    //     }
    //   })
    // }
    // if (event.claimStatus == 'analysis') {
    //   this.router.navigate(['engineer/analysis'], {
    //     queryParams: {
    //       registerNo: event.registerNo,
    //       no: event.no

    //     }
    //   })
    // }

    if (event.claimStatus == 'receive information') {
      this.router.navigate(['operator/information'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no
        }
      })
    }

    if (event.claimStatus == 'wait approve') {
      alert()
      this.router.navigate(['engineer/analysis'], {
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
