import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/Work';
import { EmployeeService } from 'src/app/services/employee-services/employee.service';

@Component({
  selector: 'app-list-proceso-alta',
  templateUrl: './list-proceso-alta.component.html',
  styleUrls: ['./list-proceso-alta.component.css']
})
export class ListProcesoAltaComponent implements OnInit {

  list:Work[] = []
  loader:Boolean = false

  page: Number = 1
  last_page: Number


  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
  }

}
