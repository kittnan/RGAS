import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-engineer-rgas1',
  templateUrl: './engineer-rgas1.component.html',
  styleUrls: ['./engineer-rgas1.component.scss']
})
export class EngineerRgas1Component implements OnInit {

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
      this.router.navigate(['engineer/approve-claim'], {
        queryParams: {
          registerNo: $event.registerNo,
          no: $event.no
        }
      })
    }
    if ($event.status == 'analysis') {
      this.router.navigate(['engineer/analysis'], {
        queryParams: {
          registerNo: $event.registerNo,
          no: $event.no

        }
      })
    }
  }
}
