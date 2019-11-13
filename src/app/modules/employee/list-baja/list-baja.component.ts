import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/Work';
import { EmployeeService } from 'src/app/services/employee-services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-baja',
  templateUrl: './list-baja.component.html',
  styleUrls: ['./list-baja.component.css']
})
export class ListBajaComponent implements OnInit {

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
    this.employeeService.getEmployees(5)
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
    this.employees_list[ind].loader = true
    this.employeeService.convertEmployee(2, this.employees_list[ind].id)
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
  }

}////
