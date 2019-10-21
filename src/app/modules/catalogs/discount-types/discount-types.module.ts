import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountTypesRoutingModule } from './discount-types-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiscountTypesComponent } from './components/discount-types/discount-types.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [DiscountTypesComponent, ModalComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DiscountTypesRoutingModule
  ]
})
export class DiscountTypesModule { }
