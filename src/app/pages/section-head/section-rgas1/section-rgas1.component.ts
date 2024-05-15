import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-rgas1',
  templateUrl: './section-rgas1.component.html',
  styleUrls: ['./section-rgas1.component.scss']
})
export class SectionRgas1Component implements OnInit {

  constructor(
    private router: Router

  ) { }

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
      this.router.navigate(['engineer/analysis'], {
        // this.router.navigate(['sectionHead/approve-claim'], {
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
  }

}
