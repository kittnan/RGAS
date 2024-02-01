import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorRoutingModule } from './operator-routing.module';
import { OperatorComponent } from './operator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OperatorRgas1Component } from './pages/operator-rgas1/operator-rgas1.component';
import { OperatorRgas2Component } from './pages/operator-rgas2/operator-rgas2.component';


@NgModule({
  declarations: [
    OperatorComponent,
    OperatorRgas1Component,
    OperatorRgas2Component,
  ],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    SharedModule
  ]
})
export class OperatorModule { }
