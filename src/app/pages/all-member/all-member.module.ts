import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllMemberRoutingModule } from './all-member-routing.module';
import { AllMemberComponent } from './all-member.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllMemberComponent
  ],
  imports: [
    CommonModule,
    AllMemberRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AllMemberModule { }
