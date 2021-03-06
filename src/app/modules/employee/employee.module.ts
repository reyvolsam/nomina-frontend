import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from "ngx-currency";
import { ListProcesoAltaComponent } from './list-proceso-alta/list-proceso-alta.component';
import { ListProcesoActivoComponent } from './list-proceso-activo/list-proceso-activo.component';
import { ListProcesoReingresoComponent } from './list-proceso-reingreso/list-proceso-reingreso.component';
import { ListProcesoBajaComponent } from './list-proceso-baja/list-proceso-baja.component';
import { ListBajaComponent } from './list-baja/list-baja.component';
import { ImportComponent } from './import/import.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';
import { ListAllComponent } from './list-all/list-all.component';
import { OnExitGuard } from '../home/guard/on-exit-guard';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { OneFileManagerComponent } from './one-file-manager/one-file-manager.component';
import { CutFileNameUrlPipe } from 'src/app/pipes/cut-file-name-url.pipe';

@NgModule({
  declarations: [
    CreateComponent,
    ListAllComponent,
    ListProcesoAltaComponent,
    ListProcesoActivoComponent,
    ListProcesoReingresoComponent,
    ListProcesoBajaComponent,
    ListBajaComponent,
    ImportComponent,
    EditComponent,
    FormComponent,
    FileManagerComponent,
    OneFileManagerComponent,
    CutFileNameUrlPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxCurrencyModule,
    EmployeeRoutingModule,
    // CutFileNameUrlPipe
  ],
  providers: [CurrencyPipe, OnExitGuard],
  exports: [FormComponent, FileManagerComponent]
})
export class EmployeeModule { }
