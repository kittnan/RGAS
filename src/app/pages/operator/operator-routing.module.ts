import { OperatorRgas2Component } from './operator-rgas2/operator-rgas2.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorRgas1Component } from './operator-rgas1/operator-rgas1.component';
import { OperatorRgasNewComponent } from './operator-rgas-new/operator-rgas-new.component';
import { OperatorRgasInformationComponent } from './operator-rgas-information/operator-rgas-information.component';
import { OperatorRgasAnalysisComponent } from './operator-rgas-analysis/operator-rgas-analysis.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
