import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './component/department/department.component';
import { ModalComponent } from './component/modal/modal.component';


@NgModule({
  declarations: [DepartmentComponent, ModalComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentRoutingModule
  ]
})
export class DepartmentModule { }
