import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { ReportDataService } from 'src/app/services/report-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-engineer-rgas-analysis',
  templateUrl: './engineer-rgas-analysis.component.html',
  styleUrls: ['./engineer-rgas-analysis.component.scss']
})
export class EngineerRgasAnalysisComponent implements OnInit {
  show: boolean = true
  form: any = null
  userLogin: any
  form2: any = null
  constructor(
    private router: Router,
    private $claim: HttpClaimService,
    private route: ActivatedRoute,
    private $user: HttpUsersService,
    private $result: HttpResultService,
    private _reportData: ReportDataService
  ) {
    route.queryParams.subscribe(async (params: any) => {
      console.log("🚀 ~ params:", params)
      if (params['registerNo']) {
        let resData = await lastValueFrom(this.$claim.get(new HttpParams().set('registerNo', JSON.stringify([params['registerNo']])).set('no', JSON.stringify([params['no']]))))
        if (resData && resData.length > 0) {
          this.form = resData[0]
          const resResult = await lastValueFrom(this.$result.get(new HttpParams().set('claimId', JSON.stringify([this.form._id]))))
          this.form2 = resResult[0]
        }
      }
    })
    let user: any = localStorage.getItem('RGAS_user')
    this.userLogin = user ? JSON.parse(user) : null
  }

  ngOnInit(): void {
  }
  // todo save event
  async onSaveChange($event: any) {
    try {
      await lastValueFrom(this.$result.createOrUpdate([$event]))
      Swal.fire({
        title: 'SUCCESS',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo event submit
  onSubmitChange($event: any) {
    try {
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo event send report
  reportChange($event: any) {
    console.log($event);
    this._reportData.set({
      ...$event,
      claimId: this.form._id
    })
    this.router.navigate(['engineer/report-approve'], {
      queryParams: {
        claimId: this.form._id,
        type: 'preReport'
      }
    })
  }

}
