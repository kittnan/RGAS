import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerApproveClaimComponent } from './engineer-approve-claim/engineer-approve-claim.component';
import { EngineerRgas1Component } from './engineer-rgas1/engineer-rgas1.component';
import { NotfoundComponent } from 'src/app/notfound/notfound.component';
import { EngineerRgas2Component } from './engineer-rgas2/engineer-rgas2.component';
import { EngineerReportApproveComponent } from './engineer-report-approve/engineer-report-approve.component';
import { EngineerReportViewComponent } from './engineer-report-view/engineer-report-view.component';
import { EngineerRgasAnalysisComponent } from './engineer-rgas-analysis/engineer-rgas-analysis.component';
import { EngineerRgasNewComponent } from './engineer-rgas-new/engineer-rgas-new.component';
import { EngineerEstimateShipmentComponent } from './engineer-estimate-shipment/engineer-estimate-shipment.component';
import { EngineerEstimateShipment2Component } from './engineer-estimate-shipment2/engineer-estimate-shipment2.component';
import { EngineerDeliveryComponent } from './engineer-delivery/engineer-delivery.component';
import { EngineerDeliveryViewComponent } from './engineer-delivery-view/engineer-delivery-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rgas1',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: EngineerRgasNewComponent
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
  {
    path: 'estimate-shipment',
    component: EngineerEstimateShipment2Component
  },
  {
    path: 'delivery',
    component: EngineerDeliveryComponent
  },
  {
    path: 'delivery-view',
    component: EngineerDeliveryViewComponent
  },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
