import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/Work';
import { EmployeeService } from 'src/app/services/employee-services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-proceso-reingreso',
  templateUrl: './list-proceso-reingreso.component.html',
  styleUrls: ['./list-proceso-reingreso.component.css']
})
export class ListProcesoReingresoComponent implements OnInit {

  list:Work[] = []
  loader:Boolean = false

  page: Number = 1
  last_page: Number

  employees_list: Work[] = []

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getEmployeesByStatus()
  }

  getEmployeesByStatus()
  {
    this.loader = true
    this.employeeService.getEmployees(2)
    .subscribe(
    res => {
      console.log(res)
      this.loader = false
      this.employees_list = res.data.data
      if(res.data.length == 0){
        Swal.fire('¡Atención!', res.message, 'warning')
      }
    },
    error => {
      console.log(error.error.message)
      this.loader = false
      Swal.fire('¡Error!', error.error.message, 'warning')
    })
  }//ChangeDepartment()

  convertEmployee(ind)
  {
    Swal.fire({
      title: '¿Estas seguro de conevrtir este empleado?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Convertir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.employees_list[ind].loader = true
        this.employeeService.convertEmployee(3, this.employees_list[ind].id)
        .subscribe(
        res => {
          console.log(res)
          this.employees_list[ind].loader = false
          this.loader = false

            this.getEmployeesByStatus()

        },
        error => {
          console.log(error.error.message)
          this.employees_list[ind].loader = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
      } else {
        Swal.fire('', 'Empleado no convertido.', 'warning')
      }
    })
  }

}////
