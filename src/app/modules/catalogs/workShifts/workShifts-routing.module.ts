import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkShiftsComponent } from './components/workShifts/workShifts.component';


const routes: Routes = [
  { path: '', component: WorkShiftsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkShiftsRoutingModule { }
