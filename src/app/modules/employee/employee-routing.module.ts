import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListProcesoAltaComponent } from './list-proceso-alta/list-proceso-alta.component';
import { ListProcesoActivoComponent } from './list-proceso-activo/list-proceso-activo.component';
import { ListProcesoReingresoComponent } from './list-proceso-reingreso/list-proceso-reingreso.component';
import { ListProcesoBajaComponent } from './list-proceso-baja/list-proceso-baja.component';
import { ListBajaComponent } from './list-baja/list-baja.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'procesoAlta', component: ListProcesoAltaComponent },
  { path: 'procesoActivo', component: ListProcesoActivoComponent },
  { path: 'procesoReingreso', component: ListProcesoReingresoComponent },
  { path: 'procesoBaja', component: ListProcesoBajaComponent },
  { path: 'baja', component: ListBajaComponent },
  { path: 'import', component: ImportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
