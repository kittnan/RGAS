import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
import { GuestViewComponent } from './guest-view/guest-view.component';
import { GuestRgas1Component } from './guest-rgas1/guest-rgas1.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GuestComponent,
    GuestViewComponent,
    GuestRgas1Component
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class GuestModule { }
