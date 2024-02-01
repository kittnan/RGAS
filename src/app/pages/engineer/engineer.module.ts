import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { EngineerComponent } from './engineer.component';


@NgModule({
  declarations: [
    EngineerComponent
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule
  ]
})
export class EngineerModule { }
