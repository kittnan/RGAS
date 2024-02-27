import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from 'src/app/https/http-report.service';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {
  report: any = null
  constructor(
    private route: ActivatedRoute,
    private $report: HttpReportService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params: any) => {
      if (params['index'] && params['name'] && params['registerNo']) {
        let httpParams: HttpParams = new HttpParams()
        httpParams = httpParams.set('index', JSON.stringify([params['index']]))
        httpParams = httpParams.set('name', JSON.stringify([params['name']]))
        httpParams = httpParams.set('registerNo', JSON.stringify([params['registerNo']]))
        const resReport = await lastValueFrom(this.$report.get(httpParams))
        if (resReport && resReport.length > 0) {
          this.report = resReport[0]
          console.log("🚀 ~ this.report:", this.report)
        }
      }

    })
  }

  // todo show user login name
  displayName(user: any) {
    if (user) {
      let firstName = user.firstName ? user.firstName : ''
      let lastName = user.lastName ? user.lastName[0] : ''
      return `${firstName}-${lastName}`
    }
    return ''
  }
  displayNames(users:any){
    return users.map((user:any)=>{
      let firstName = user.firstName ? user.firstName : ''
      let lastName = user.lastName ? user.lastName[0] : ''
      return `${firstName}-${lastName}`
    })
  }

  cssFlow(item: any) {
    if (this.report?.status == item) return 'card-step-active'
    return ''
  }

}
