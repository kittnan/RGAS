import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { EngineerComponent } from './engineer.component';
import { EngineerApproveClaimComponent } from './engineer-approve-claim/engineer-approve-claim.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EngineerRgas1Component } from './engineer-rgas1/engineer-rgas1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EngineerComponent,
    EngineerApproveClaimComponent,
    EngineerRgas1Component,
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
