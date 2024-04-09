import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-rgas1',
  templateUrl: './guest-rgas1.component.html',
  styleUrls: ['./guest-rgas1.component.scss']
})
export class GuestRgas1Component implements OnInit {

  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {
  }


  // todo click row
  onClickClaimChange($event: any) {
    this.router.navigate(['guest/view'], {
      queryParams: {
        registerNo: $event.registerNo,
        no: $event.no
      }
    })
  }
}
