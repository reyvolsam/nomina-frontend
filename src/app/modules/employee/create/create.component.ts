import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

import { SharedServices } from 'src/app/services/shared-services/shared-services.service';

import { EmployeeService } from 'src/app/services/employee-services/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private sharedServices: SharedServices,
    private employeeServices: EmployeeService
  )
  {}

  ngOnInit() {
  }

}////
