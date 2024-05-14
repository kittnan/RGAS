import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportKcDcComponent } from './report-kc-dc/report-kc-dc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'kc-dc',
    pathMatch: 'full'
  },
  {
    path: 'kc-dc',
    component: ReportKcDcComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllMemberRoutingModule { }
