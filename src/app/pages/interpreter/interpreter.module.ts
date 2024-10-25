import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterpreterRoutingModule } from './interpreter-routing.module';
import { InterpreterComponent } from './interpreter.component';
import { InterpreterRgas1Component } from './interpreter-rgas1/interpreter-rgas1.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InterpreterRgasAnalysisComponent } from './interpreter-rgas-analysis/interpreter-rgas-analysis.component';
import { InterpreterReportApproveComponent } from './interpreter-report-approve/interpreter-report-approve.component';
import { InterpreterReportViewComponent } from './interpreter-report-view/interpreter-report-view.component';
import { InterpreterRgas1AntComponent } from './interpreter-rgas1-ant/interpreter-rgas1-ant.component';


@NgModule({
  declarations: [
    InterpreterComponent,
    InterpreterRgas1Component,
    InterpreterRgasAnalysisComponent,
    InterpreterReportApproveComponent,
    InterpreterReportViewComponent,
    InterpreterRgas1AntComponent
  ],
  imports: [
    CommonModule,
    InterpreterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InterpreterModule { }
