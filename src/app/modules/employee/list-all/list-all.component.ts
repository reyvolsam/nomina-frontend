import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/Work';
import { EmployeeService } from 'src/app/services/employee-services/employee.service';
import Swal from 'sweetalert2';
import { ExcelGenerateService } from '../../../services/generate-excel/excel-generate-service.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {

  list: Work[] = []
  loader: Boolean = false

  page: Number = 1
  last_page: Number

  employees_list: Work[] = []

  constructor(
    private employeeService: EmployeeService,
    private excelGenerateService: ExcelGenerateService
  ) { }

  ngOnInit() {
    this.getEmployeesByStatus(this.page)
  }

  getEmployeesByStatus(page) {
    this.loader = true
    this.employees_list = []
    this.employeeService.getEmployees('?page%5Bnumber%5D=' + page, null)
      .subscribe(
        res => {
          console.log(res)
          this.loader = false
          this.employees_list = res.data.data
          if (res.data.length != 0) {
            if (res.data.data.length == 0) {
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


  generateExcel(data: Work) {
    console.log('Empleado data: ', data);
    this.excelGenerateService.generateExcel(data)
  }

}////
