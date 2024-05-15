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
import { M1eComponent } from './m1e/m1e.component';
import { RPrincipleComponent } from './r-principle/r-principle.component';
import { ModelsManageCommonComponent } from './models-manage-common/models-manage-common.component';
import { EmailComponent } from './email/email.component';
import { EmailDearAllComponent } from './email-dear-all/email-dear-all.component';

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
    M1eComponent,
    RPrincipleComponent,
    ModelsManageCommonComponent,
    EmailComponent,
    EmailDearAllComponent,
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
