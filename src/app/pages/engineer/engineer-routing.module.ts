import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerApproveClaimComponent } from './engineer-approve-claim/engineer-approve-claim.component';
import { EngineerRgas1Component } from './engineer-rgas1/engineer-rgas1.component';
import { NotfoundComponent } from 'src/app/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'approve-claim',
    component: EngineerApproveClaimComponent
  },
  {
    path: 'rgas1',
    component: EngineerRgas1Component
  },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
