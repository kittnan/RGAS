import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AdminModule } from './admin/admin.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { DepartmentHeadModule } from './pages/department-head/department-head.module';
import { EngineerModule } from './pages/engineer/engineer.module';
import { InterpreterModule } from './pages/interpreter/interpreter.module';
import { OperatorModule } from './pages/operator/operator.module';
import { SectionHeadModule } from './pages/section-head/section-head.module';
import { LoginComponent } from './shared/login/login.component';

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
    path: 'operator',
    loadChildren: () => OperatorModule,
    canActivate: [],
  },
  {
    path: 'engineer',
    loadChildren: () => EngineerModule,
    canActivate: [],
  },
  {
    path: 'sectionHead',
    loadChildren: () => SectionHeadModule,
    canActivate: [],
  },
  {
    path: 'interpreter',
    loadChildren: () => InterpreterModule,
    canActivate: [],
  },
  {
    path: 'departmentHead',
    loadChildren: () => DepartmentHeadModule,
    canActivate: [],
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
