import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MethodPaymentsComponent } from './component/method-payments/method-payments.component';


const routes: Routes = [
  { path: '', component: MethodPaymentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MethodPaymentsRoutingModule { }
