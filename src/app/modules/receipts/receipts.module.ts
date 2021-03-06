import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptsRoutingModule } from './receipts-routing.module';
import { ListComponent } from './components/list/list.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
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
    ReceiptsRoutingModule
  ]
})
export class ReceiptsModule { }
