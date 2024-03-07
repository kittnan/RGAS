import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from 'src/app/https/http-report.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {
  report: any = null
  constructor(
    private route: ActivatedRoute,
    private $report: HttpReportService,
    private location: Location
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
        }
      }

    })
  }

  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name
    }
    return ''
  }
  displayNames(users: any) {
    return users.map((user: any) => {
      return user.name
    })
  }

  cssFlow(item: any) {
    if (this.report?.status == item) return 'card-step-active'
    return ''
  }
  onBack() {
    this.location.back()
  }

}
