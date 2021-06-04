import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespaldosSUARoutingModule } from './respaldos-sua-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaRespaldosSuaComponent } from './components/lista-respaldos-sua/lista-respaldos-sua.component';
import { ModalRespaldosSuaComponent } from './components/modal-respaldos-sua/modal-respaldos-sua.component';
import { ModalDownloadFilesComponent } from '../shared/components/modal-download-files/modal-download-files.component';



@NgModule({
  declarations: [ListaRespaldosSuaComponent, ModalRespaldosSuaComponent],
  entryComponents: [ModalRespaldosSuaComponent, ModalDownloadFilesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RespaldosSUARoutingModule
  ]
})
export class RespaldosSuaModule { }
