import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountTypesComponent } from './components/discount-types/discount-types.component';


const routes: Routes = [
  { path: '', component: DiscountTypesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountTypesRoutingModule { }
