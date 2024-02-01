import { OperatorRgas2Component } from './pages/operator-rgas2/operator-rgas2.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorRgas1Component } from './pages/operator-rgas1/operator-rgas1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rgas1',
    pathMatch: 'full'
  },
  {
    path: 'rgas1',
    component: OperatorRgas1Component
  },
  {
    path: 'rgas2',
    component: OperatorRgas2Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
