import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CFDINominaRoutingModule } from './cfdi-nomina-routing.module';
import { ListCfdiComponent } from './components/list-cfdi/list-cfdi.component';
import { ModalCfdiComponent } from './components/modal-cfdi/modal-cfdi.component';



@NgModule({
  declarations: [ListCfdiComponent, ModalCfdiComponent],
  entryComponents: [ModalCfdiComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CFDINominaRoutingModule
  ]
})
export class CfdiNominaModule { }
