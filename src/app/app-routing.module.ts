import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { UsersComponent } from './users/users.component';
import { UserManageComponent } from './users/user-manage/user-manage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { RgasComponent } from './rgas/rgas.component';
import { RgasManageComponent } from './rgas/rgas-manage/rgas-manage.component';
import { Rgas1Component } from './rgas/rgas1/rgas1.component';
import { Rgas2Component } from './rgas/rgas2/rgas2.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'manage',
        component: UserManageComponent
      },
      {
        path: 'new',
        component: UserNewComponent
      }
    ]
  },
  {
    path: 'rgas',
    component: RgasComponent,
    children: [
      {
        path: 'manage',
        component: RgasManageComponent
      },
      {
        path: '1',
        component: Rgas1Component
      },
      {
        path: '2',
        component: Rgas2Component
      }
    ]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
