import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestViewComponent } from './guest-view/guest-view.component';
import { GuestRgas1Component } from './guest-rgas1/guest-rgas1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rgas1',
    pathMatch: 'full'
  },
  {
    path: 'rgas1',
    component: GuestRgas1Component
  },
  {
    path: 'view',
    component: GuestViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
