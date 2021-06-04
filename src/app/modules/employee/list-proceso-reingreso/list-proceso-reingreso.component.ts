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

  page: number = 1
  last_page: Number

  employees_list: Work[] = []

  isCollapsed = true;
  filter = {
    name: "",
    first_name: "",
    last_name: "",
    code: null,
    email: ""
  };

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getEmployeesByStatus(this.page)
  }

  getEmployeesByStatus(page)
  {
    this.loader = true
    this.employees_list = []
    this.employeeService.getEmployees('?page%5Bnumber%5D='+page, 2, this.filter)
    .subscribe(
    res => {
      console.log(res)
      this.loader = false
      this.employees_list = res.data.data
      if(res.data.length != 0){
        if(res.data.data.length == 0){
          Swal.fire('¡Atención!', res.message, 'warning')
        } else {
          this.page = res.data.current_page
          this.last_page = res.data.last_page
        }
      } else {
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
      title: '¿Estas seguro de convertir este empleado?',
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

            this.getEmployeesByStatus(this.page)

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

  reset()
  {
    this.filter.name = ""
    this.filter.first_name = ""
    this.filter.last_name = ""
    this.filter.email =""
    this.filter.code = null

    this.getEmployeesByStatus(this.page)
  }//reset()

}////
