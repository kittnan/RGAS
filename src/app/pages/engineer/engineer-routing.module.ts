import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerApproveClaimComponent } from './engineer-approve-claim/engineer-approve-claim.component';
import { EngineerRgas1Component } from './engineer-rgas1/engineer-rgas1.component';
import { NotfoundComponent } from 'src/app/notfound/notfound.component';
import { EngineerRgas2Component } from './engineer-rgas2/engineer-rgas2.component';
import { EngineerRgasAnalysisComponent } from './engineer-rgas-analysis/engineer-rgas-analysis.component';
import { EngineerReportApproveComponent } from './engineer-report-approve/engineer-report-approve.component';
import { EngineerReportViewComponent } from './engineer-report-view/engineer-report-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rgas1',
    pathMatch: 'full'
  },
  {
    path: 'approve-claim',
    component: EngineerApproveClaimComponent
  },
  {
    path: 'analysis',
    component: EngineerRgasAnalysisComponent
  },
  {
    path: 'report-approve',
    component: EngineerReportApproveComponent
  },
  {
    path: 'report-view',
    component: EngineerReportViewComponent
  },
  {
    path: 'rgas1',
    component: EngineerRgas1Component
  },
  {
    path: 'rgas2',
    component: EngineerRgas2Component
  },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
