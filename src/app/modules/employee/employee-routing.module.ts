import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListProcesoAltaComponent } from './list-proceso-alta/list-proceso-alta.component';


const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'procesoAlta', component: ListProcesoAltaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
