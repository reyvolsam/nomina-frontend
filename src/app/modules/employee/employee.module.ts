import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from "ngx-currency";
import { DisableControlDirective } from './directives/disableControl.directive';
import { ListProcesoAltaComponent } from './list-proceso-alta/list-proceso-alta.component';
import { ListProcesoActivoComponent } from './list-proceso-activo/list-proceso-activo.component';
import { ListProcesoReingresoComponent } from './list-proceso-reingreso/list-proceso-reingreso.component';
import { ListProcesoBajaComponent } from './list-proceso-baja/list-proceso-baja.component';
import { ListBajaComponent } from './list-baja/list-baja.component';
import { ImportComponent } from './import/import.component';


@NgModule({
  declarations: [
    CreateComponent, 
    DisableControlDirective, 
    ListProcesoAltaComponent, 
    ListProcesoActivoComponent, 
    ListProcesoReingresoComponent,
    ListProcesoBajaComponent,
    ListBajaComponent,
    ImportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxCurrencyModule,
    EmployeeRoutingModule
  ],
  providers: [CurrencyPipe]
})
export class EmployeeModule { }
