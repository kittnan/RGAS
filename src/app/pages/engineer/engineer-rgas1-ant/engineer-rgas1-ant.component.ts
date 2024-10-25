import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-engineer-rgas1-ant',
  templateUrl: './engineer-rgas1-ant.component.html',
  styleUrls: ['./engineer-rgas1-ant.component.scss']
})
export class EngineerRgas1AntComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClickNewChange() {
    this.router.navigate(['engineer/new'])
  }
  // todo click row
  onClickClaimChange(event: any) {
    console.log("🚀 ~ event:", event)
    if (event.claimStatus == 'receive information') {
      this.router.navigate(['operator/information'], {
        queryParams: {
          registerNo: event.registerNo,
          no: event.no
        }
      })
    }
    if (event.claimStatus == 'wait approve') {
      this.router.navigate(['engineer/approve-claim'], {
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
