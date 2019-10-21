import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkShiftsRoutingModule } from './workShifts-routing.module';
import { WorkShiftsComponent } from './components/workShifts/workShifts.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [WorkShiftsComponent, ModalComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    WorkShiftsRoutingModule
  ]
})
export class WorkShiftsModule { }
