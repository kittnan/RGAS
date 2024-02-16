import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpUsersService } from 'src/app/https/http-users.service';

@Component({
  selector: 'app-engineer-approve-claim',
  templateUrl: './engineer-approve-claim.component.html',
  styleUrls: ['./engineer-approve-claim.component.scss']
})
export class EngineerApproveClaimComponent implements OnInit {

  form: any
  state: any
  sendTo: any

  // todo analysis PIC option
  analysisPICOption: any[] = []

  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private route: ActivatedRoute,
    private $user: HttpUsersService
  ) {
    route.queryParams.subscribe(async (params: any) => {
      console.log("🚀 ~ params:", params)
      if (params['registerNo']) {
        let resData = await lastValueFrom(this.$claim.get(new HttpParams().set('registerNo', JSON.stringify([params['registerNo']])).set('no', JSON.stringify([params['no']]))))
        console.log("🚀 ~ resData:", resData)
        if (resData && resData.length > 0) {
          this.form = resData[0]
        }
      }
    })
    this.state = this.router.getCurrentNavigation()?.extras.state
  }

  async ngOnInit(): Promise<void> {
    try {

      let userParam = new HttpParams().set('access', JSON.stringify(['engineer']))
      this.analysisPICOption = await lastValueFrom(this.$user.get(userParam))

      console.log(this.state);
      if (this.state) {
        let resData = await lastValueFrom(this.$claim.get(new HttpParams().set('registerNo', JSON.stringify([this.state.registerNo]))))
        console.log("🚀 ~ resData:", resData)
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    if (option._id && value._id) {
      return option._id === value._id;
    }
    return false
  }
}
