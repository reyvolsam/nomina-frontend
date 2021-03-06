import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImssRoutingModule } from './imss-routing.module';
import { ListComponent } from './components/list/list.component';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDownloadFilesComponent } from '../shared/components/modal-download-files/modal-download-files.component';


@NgModule({
  declarations: [ListComponent, ModalComponent],
  entryComponents: [ModalComponent, ModalDownloadFilesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ImssRoutingModule
  ]
})
export class ImssModule { }
