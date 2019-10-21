import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractTypesRoutingModule } from './contractTypes-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { ContractTypesComponent } from './components/contractTypes/contractTypes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContractTypesComponent, ModalComponent],
  entryComponents: [ ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ContractTypesRoutingModule
  ]
})
export class ContractTypesModule { }
