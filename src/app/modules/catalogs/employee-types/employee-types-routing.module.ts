import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeTypesComponent } from './components/employee-types/employee-types.component';


const routes: Routes = [
  { path: '', component: EmployeeTypesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeTypesRoutingModule { }
