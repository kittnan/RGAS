import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { EngineerComponent } from './engineer.component';
import { EngineerApproveClaimComponent } from './engineer-approve-claim/engineer-approve-claim.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EngineerRgas1Component } from './engineer-rgas1/engineer-rgas1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EngineerRgas2Component } from './engineer-rgas2/engineer-rgas2.component';
import { EngineerReportApproveComponent } from './engineer-report-approve/engineer-report-approve.component';
import { EngineerReportViewComponent } from './engineer-report-view/engineer-report-view.component';
import { EngineerRgasAnalysisComponent } from './engineer-rgas-analysis/engineer-rgas-analysis.component';
import { EngineerRgasNewComponent } from './engineer-rgas-new/engineer-rgas-new.component';
import { EngineerEstimateShipmentComponent } from './engineer-estimate-shipment/engineer-estimate-shipment.component';
import { SafeHtmlPipe } from './engineer-estimate-shipment/safeHtml.pipe';


@NgModule({
  declarations: [
    EngineerComponent,
    EngineerApproveClaimComponent,
    EngineerRgas1Component,
    EngineerRgas2Component,
    EngineerReportApproveComponent,
    EngineerReportViewComponent,
    EngineerRgasAnalysisComponent,
    EngineerRgasNewComponent,
    EngineerEstimateShipmentComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EngineerModule { }
