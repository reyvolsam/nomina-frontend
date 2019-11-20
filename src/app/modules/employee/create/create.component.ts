import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

import { SharedServices } from 'src/app/services/shared-services/shared-services.service';

import { Company } from 'src/app/models/Company'
import { ContractTypes } from 'src/app/models/ContractTypes'
import { PeriodTypes } from 'src/app/models/PeriodTypes'
import { ContributionBases } from 'src/app/models/ContributionBases'
import { Department } from 'src/app/models/Department'
import { Job } from 'src/app/models/Job'
import { EmployeeTypes } from 'src/app/models/EmployeeTypes'
import { MethodPayment } from 'src/app/models/MethodPayment'
import { WorkShifts } from 'src/app/models/WorkShifts'
import { Sex } from 'src/app/models/Sex'
import { DiscountTypes } from 'src/app/models/DiscountTypes'
import Swal from 'sweetalert2';
import { EmployeeService } from 'src/app/services/employee-services/employee.service';
import { FormComponent } from '../form/form.component'

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
