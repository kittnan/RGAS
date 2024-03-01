import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterpreterRgas1Component } from './interpreter-rgas1/interpreter-rgas1.component';
import { InterpreterRgasAnalysisComponent } from './interpreter-rgas-analysis/interpreter-rgas-analysis.component';
import { InterpreterReportApproveComponent } from './interpreter-report-approve/interpreter-report-approve.component';
import { InterpreterReportViewComponent } from './interpreter-report-view/interpreter-report-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rgas1',
    pathMatch: 'full'
  },
  {
    path: 'rgas1',
    component: InterpreterRgas1Component
  },
  {
    path: 'analysis',
    component: InterpreterRgasAnalysisComponent
  },
  {
    path: 'report-approve',
    component: InterpreterReportApproveComponent
  },
  {
    path: 'report-view',
    component: InterpreterReportViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterpreterRoutingModule { }
