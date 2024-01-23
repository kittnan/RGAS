import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManageComponent } from './users/user-manage/user-manage.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { ModelsManageComponent } from './models-manage/models-manage.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
