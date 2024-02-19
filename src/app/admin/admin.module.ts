import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ModelsManageComponent } from './models-manage/models-manage.component';
import { UserManageComponent } from './users/user-manage/user-manage.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MastersComponent } from './masters/masters.component';
import { DefectManageComponent } from './defect-manage/defect-manage.component';
import { DCdComponent } from './d-cd/d-cd.component';
import { LCdComponent } from './l-cd/l-cd.component';
import { SCdComponent } from './s-cd/s-cd.component';
import { FlowReportComponent } from './flow-report/flow-report.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AdminComponent,
    ModelsManageComponent,
    UserManageComponent,
    UserNewComponent,
    MastersComponent,
    DefectManageComponent,
    DCdComponent,
    LCdComponent,
    SCdComponent,
    FlowReportComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DragDropModule
  ],
  exports: [
  ]
})
export class AdminModule { }
