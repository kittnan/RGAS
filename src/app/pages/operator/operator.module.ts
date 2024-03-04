import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorRoutingModule } from './operator-routing.module';
import { OperatorComponent } from './operator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OperatorRgas1Component } from './operator-rgas1/operator-rgas1.component';
import { OperatorRgas2Component } from './operator-rgas2/operator-rgas2.component';
import { OperatorRgasNewComponent } from './operator-rgas-new/operator-rgas-new.component';
import { OperatorRgasInformationComponent } from './operator-rgas-information/operator-rgas-information.component';
import { OperatorRgasAnalysisComponent } from './operator-rgas-analysis/operator-rgas-analysis.component';


@NgModule({
  declarations: [
    OperatorComponent,
    OperatorRgas1Component,
    OperatorRgas2Component,
    OperatorRgasNewComponent,
    OperatorRgasInformationComponent,
    OperatorRgasAnalysisComponent,
  ],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    SharedModule
  ]
})
export class OperatorModule { }
