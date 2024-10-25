import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionHeadRoutingModule } from './section-head-routing.module';
import { SectionRgas1Component } from './section-rgas1/section-rgas1.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SectionRgasAnalysisComponent } from './section-rgas-analysis/section-rgas-analysis.component';
import { SectionReportApproveComponent } from './section-report-approve/section-report-approve.component';
import { SectionReportViewComponent } from './section-report-view/section-report-view.component';
import { SectionRgas1AntComponent } from './section-rgas1-ant/section-rgas1-ant.component';


@NgModule({
  declarations: [
    SectionRgas1Component,
    SectionRgasAnalysisComponent,
    SectionReportApproveComponent,
    SectionReportViewComponent,
    SectionRgas1AntComponent
  ],
  imports: [
    CommonModule,
    SectionHeadRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SectionHeadModule { }
