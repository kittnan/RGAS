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


@NgModule({
  declarations: [
    AdminComponent,
    ModelsManageComponent,
    UserManageComponent,
    UserNewComponent,
    MastersComponent,
    DefectManageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
  ]
})
export class AdminModule { }
