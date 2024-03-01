import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentRgas1Component } from './department-rgas1/department-rgas1.component';
import { DepartmentRgasAnalysisComponent } from './department-rgas-analysis/department-rgas-analysis.component';
import { DepartmentReportApproveComponent } from './department-report-approve/department-report-approve.component';
import { DepartmentReportViewComponent } from './department-report-view/department-report-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rgas1',
    pathMatch: 'full'
  },
  {
    path: 'rgas1',
    component: DepartmentRgas1Component
  },
  {
    path: 'analysis',
    component: DepartmentRgasAnalysisComponent
  },
  {
    path: 'report-approve',
    component: DepartmentReportApproveComponent
  },
  {
    path: 'report-view',
    component: DepartmentReportViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentHeadRoutingModule { }
