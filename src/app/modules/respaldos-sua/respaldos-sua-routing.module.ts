import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaRespaldosSuaComponent } from './components/lista-respaldos-sua/lista-respaldos-sua.component';

const routes: Routes = [
  { path: '', component: ListaRespaldosSuaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespaldosSUARoutingModule { }
