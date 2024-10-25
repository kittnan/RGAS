import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentHeadRoutingModule } from './department-head-routing.module';
import { DepartmentRgas1Component } from './department-rgas1/department-rgas1.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentRgasAnalysisComponent } from './department-rgas-analysis/department-rgas-analysis.component';
import { DepartmentReportApproveComponent } from './department-report-approve/department-report-approve.component';
import { DepartmentReportViewComponent } from './department-report-view/department-report-view.component';
import { DepartmentRgas1AntComponent } from './department-rgas1-ant/department-rgas1-ant.component';


@NgModule({
  declarations: [
    DepartmentRgas1Component,
    DepartmentRgasAnalysisComponent,
    DepartmentReportApproveComponent,
    DepartmentReportViewComponent,
    DepartmentRgas1AntComponent
  ],
  imports: [
    CommonModule,
    DepartmentHeadRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DepartmentHeadModule { }
