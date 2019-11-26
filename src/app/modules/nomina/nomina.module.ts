import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NominaRoutingModule } from './nomina-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './nomina/list/list.component';
import { ModalComponent } from './nomina/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DisableControlDirective } from '../employee/directives/disableControl.directive';


@NgModule({
  declarations: [ListComponent, ModalComponent, DisableControlDirective],
  entryComponents: [ ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NominaRoutingModule
  ]
})
export class NominaModule { }
