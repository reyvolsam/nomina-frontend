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


@NgModule({
  declarations: [CreateComponent, DisableControlDirective, ListProcesoAltaComponent],
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
