import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router';
import { DisableControlDirective } from '../employee/directives/disableControl.directive';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [HeaderComponent, DisableControlDirective],
  exports: [HeaderComponent, DisableControlDirective]
})
export class SharedModule { }
