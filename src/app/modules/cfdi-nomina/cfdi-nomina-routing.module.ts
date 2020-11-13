import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCfdiComponent } from './components/list-cfdi/list-cfdi.component';

const routes: Routes = [
  { path: '', component: ListCfdiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CFDINominaRoutingModule { }
