import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodTypesComponent } from './components/period-types/period-types.component';


const routes: Routes = [
  { path: '', component: PeriodTypesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodTypesRoutingModule { }
