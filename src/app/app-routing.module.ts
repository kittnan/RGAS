import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './shared/login/login.component';
import { AdminModule } from './admin/admin.module';
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
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: [],
  },
  {
    path: 'rgas2',
    component: Rgas2Component
  },
  // {
  //   path: 'models',
  //   component: ModelsComponent,
  //   children: [
  //     {
  //       path: 'manage',
  //       component: ModelsManageComponent
  //     },

  //   ]
  // },
  // {
  //   path: 'rgas',
  //   component: RgasComponent,
  //   children: [
  //     {
  //       path: 'manage',
  //       component: RgasManageComponent
  //     },
  //     {
  //       path: '1',
  //       component: Rgas1Component
  //     },
  //     {
  //       path: '2',
  //       component: Rgas2Component
  //     }
  //   ]
  // },
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
