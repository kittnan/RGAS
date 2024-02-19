import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { EngineerComponent } from './engineer.component';
import { EngineerApproveClaimComponent } from './engineer-approve-claim/engineer-approve-claim.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EngineerRgas1Component } from './engineer-rgas1/engineer-rgas1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EngineerRgas2Component } from './engineer-rgas2/engineer-rgas2.component';
import { EngineerRgasAnalysisComponent } from './engineer-rgas-analysis/engineer-rgas-analysis.component';


@NgModule({
  declarations: [
    EngineerComponent,
    EngineerApproveClaimComponent,
    EngineerRgas1Component,
    EngineerRgas2Component,
    EngineerRgasAnalysisComponent,
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EngineerModule { }
