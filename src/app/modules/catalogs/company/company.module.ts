import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './components/company/company.component';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CompanyComponent, ModalComponent],
  entryComponents: [ ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
