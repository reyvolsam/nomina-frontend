import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodTypesRoutingModule } from './period-types-routing.module';
import { PeriodTypesComponent } from './components/period-types/period-types.component';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PeriodTypesComponent, ModalComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PeriodTypesRoutingModule
  ]
})
export class PeriodTypesModule { }
