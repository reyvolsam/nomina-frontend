import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContributionBasesComponent } from './components/contributionBases/contributionBases.component';

const routes: Routes = [
  { path: '', component: ContributionBasesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributionBasesRoutingModule { }
