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
  onClickClaimChange($event: any) {
    console.log($event);
    if ($event.status == 'wait approve') {
      this.router.navigate(['sectionHead/approve-claim'], {
        queryParams: {
          registerNo: $event.registerNo,
          no: $event.no
        }
      })
    }
    if ($event.status == 'analysis') {
      this.router.navigate(['sectionHead/analysis'], {
        queryParams: {
          registerNo: $event.registerNo,
          no: $event.no

        }
      })
    }
  }

}
