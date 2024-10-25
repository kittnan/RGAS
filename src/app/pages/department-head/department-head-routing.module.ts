import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentRgas1Component } from './department-rgas1/department-rgas1.component';
import { DepartmentRgasAnalysisComponent } from './department-rgas-analysis/department-rgas-analysis.component';
import { DepartmentReportApproveComponent } from './department-report-approve/department-report-approve.component';
import { DepartmentReportViewComponent } from './department-report-view/department-report-view.component';
import { DepartmentRgas1AntComponent } from './department-rgas1-ant/department-rgas1-ant.component';

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
    path: 'rgas1-ant',
    component: DepartmentRgas1AntComponent
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
