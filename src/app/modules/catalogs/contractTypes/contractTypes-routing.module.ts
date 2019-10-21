import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractTypesComponent } from './components/contractTypes/contractTypes.component';

const routes: Routes = [
  { path: '', component: ContractTypesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractTypesRoutingModule { }
