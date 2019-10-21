import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodPaymentsRoutingModule } from './method-payments-routing.module';
import { MethodPaymentsComponent } from './component/method-payments/method-payments.component';
import { ModalComponent } from './component/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MethodPaymentsComponent, ModalComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MethodPaymentsRoutingModule
  ]
})
export class MethodPaymentsModule { }
