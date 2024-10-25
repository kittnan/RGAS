import { OperatorRgas2Component } from './operator-rgas2/operator-rgas2.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorRgas1Component } from './operator-rgas1/operator-rgas1.component';
import { OperatorRgasNewComponent } from './operator-rgas-new/operator-rgas-new.component';
import { OperatorRgasInformationComponent } from './operator-rgas-information/operator-rgas-information.component';
import { OperatorRgasAnalysisComponent } from './operator-rgas-analysis/operator-rgas-analysis.component';
import { OperatorReportViewComponent } from './operator-report-view/operator-report-view.component';
import { OperatorRgas1AntComponent } from './operator-rgas1-ant/operator-rgas1-ant.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rgas1',
    pathMatch: 'full'
  },
  {
    path: 'rgas1',
    component: OperatorRgas1Component
  },
  {
    path: 'rgas1-ant',
    component: OperatorRgas1AntComponent
  },
  {
    path: 'information',
    component: OperatorRgasInformationComponent
  },
  {
    path: 'analysis',
    component: OperatorRgasAnalysisComponent
  },
  {
    path: 'rgas2',
    component: OperatorRgas2Component
  },
  {
    path: 'new',
    component: OperatorRgasNewComponent
  },
  {
    path: 'report-view',
    component: OperatorReportViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
