import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionRgas1Component } from './section-rgas1/section-rgas1.component';
import { SectionRgasAnalysisComponent } from './section-rgas-analysis/section-rgas-analysis.component';
import { SectionReportApproveComponent } from './section-report-approve/section-report-approve.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rgas1',
    pathMatch: 'full'
  },
  {
    path: 'rgas1',
    component: SectionRgas1Component
  },
  {
    path: 'analysis',
    component: SectionRgasAnalysisComponent
  },
  {
    path: 'report-approve',
    component: SectionReportApproveComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionHeadRoutingModule { }
