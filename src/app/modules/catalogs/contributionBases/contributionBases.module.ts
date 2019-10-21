import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributionBasesRoutingModule } from './contributionBases-routing.module';
import { ContributionBasesComponent } from './components/contributionBases/contributionBases.component';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContributionBasesComponent, ModalComponent],
  entryComponents: [ ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ContributionBasesRoutingModule
  ]
})
export class ContributionBasesModule { }
