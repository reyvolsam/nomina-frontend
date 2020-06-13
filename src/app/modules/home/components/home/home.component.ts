import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apps = [
    { nombre: 'Crear Empleado', icono: 'person_add_alt_1', url: '/employee/create' },

  ]
  constructor() { }

  ngOnInit() {
  }

}
