import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router';
import { DisableControlDirective } from '../employee/directives/disableControl.directive';
import { ModalDownloadFilesComponent } from './components/modal-download-files/modal-download-files.component';
import { TableDownloadFilesComponent } from './components/table-download-files/table-download-files.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [HeaderComponent, DisableControlDirective, ModalDownloadFilesComponent, TableDownloadFilesComponent],
  exports: [HeaderComponent, DisableControlDirective, ModalDownloadFilesComponent, TableDownloadFilesComponent]
})
export class SharedModule { }
