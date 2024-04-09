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
import { AdminGuard } from './guards/admin.guard';
import { OperatorGuard } from './guards/operator.guard';
import { EngineerGuard } from './guards/engineer.guard';
import { SectionGuard } from './guards/section.guard';
import { InterpreterGuard } from './guards/interpreter.guard';
import { DepartmentGuard } from './guards/department.guard';
import { GuestModule } from './pages/guest/guest.module';

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
    canActivate: [AdminGuard],
  },
  {
    path: 'guest',
    loadChildren: () => GuestModule,
  },
  {
    path: 'operator',
    loadChildren: () => OperatorModule,
    canActivate: [OperatorGuard],
  },
  {
    path: 'engineer',
    loadChildren: () => EngineerModule,
    canActivate: [EngineerGuard],
  },
  {
    path: 'sectionHead',
    loadChildren: () => SectionHeadModule,
    canActivate: [SectionGuard],
  },
  {
    path: 'interpreter',
    loadChildren: () => InterpreterModule,
    canActivate: [InterpreterGuard],
  },
  {
    path: 'departmentHead',
    loadChildren: () => DepartmentHeadModule,
    canActivate: [DepartmentGuard],
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
