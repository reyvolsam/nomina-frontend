import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobComponent } from './components/job/job.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [JobComponent, ModalComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    JobRoutingModule
  ]
})
export class JobModule { }
