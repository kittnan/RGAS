import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManageComponent } from './users/user-manage/user-manage.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { ModelsManageComponent } from './models-manage/models-manage.component';
import { MastersComponent } from './masters/masters.component';
import { DefectManageComponent } from './defect-manage/defect-manage.component';
import { DCdComponent } from './d-cd/d-cd.component';
import { LCdComponent } from './l-cd/l-cd.component';
import { SCdComponent } from './s-cd/s-cd.component';
import { FlowReportComponent } from './flow-report/flow-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-manage',
    pathMatch: 'full',
  },
  {
    path: 'users-manage',
    component: UserManageComponent,
  },
  {
    path: 'users-new',
    component: UserNewComponent,
  },
  {
    path: 'models-manage',
    component: ModelsManageComponent,
  },
  {
    path: 'defect-manage',
    component: DefectManageComponent,
  },
  {
    path: 'masters',
    component: MastersComponent,
  },
  {
    path: 'd-cd',
    component: DCdComponent,
  },
  {
    path: 'l-cd',
    component: LCdComponent,
  },
  {
    path: 's-cd',
    component: SCdComponent,
  },
  {
    path: 'flow-report',
    component: FlowReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
