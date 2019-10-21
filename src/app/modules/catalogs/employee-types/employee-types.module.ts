import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeTypesRoutingModule } from './employee-types-routing.module';
import { EmployeeTypesComponent } from './components/employee-types/employee-types.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [EmployeeTypesComponent, ModalComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeTypesRoutingModule
  ]
})
export class EmployeeTypesModule { }
