import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';

@Component({
  selector: 'app-admin-rgas1',
  templateUrl: './admin-rgas1.component.html',
  styleUrls: ['./admin-rgas1.component.scss']
})
export class AdminRgas1Component implements OnInit {


  constructor(
    private router: Router,
    private $claim: HttpClaimService
  ) { }

  ngOnInit(): void {
  }

  onClickNewChange() {
    this.router.navigate(['engineer/new'])
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

  async onClaimChange(e: any) {
    try {
      console.log(e);
      e.status = 'cancel'
      let res: any = await lastValueFrom(this.$claim.createOrUpdate(e))
      location.reload()
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}
