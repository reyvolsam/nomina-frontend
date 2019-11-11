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

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  workForm: FormGroup
  loader_data: Boolean = false
  submitted: Boolean = false

  company_list: Company[] = []
  contract_types_list: ContractTypes[] = []
  period_types_list: PeriodTypes[] = []
  conribution_bases_list: ContributionBases[] = []
  departments_list: Department[] = []
  jobs_list: Job[] = []
  employee_types_list: EmployeeTypes[] = []
  payment_methods_list: MethodPayment[] = []
  work_shifts_list: WorkShifts[] = []
  sexs_list: Sex[] = [{id: 1, name: 'Hombre'}, {id: 2, name: 'Mujer'}];
  discount_types_list: DiscountTypes[] = []

  constructor(
    private formBuilder: FormBuilder,
    private sharedServices: SharedServices,
    private employeeServices: EmployeeService
  )
  {
    this.workForm = this.formBuilder.group({
      id: [],
      company_id: [null, [Validators.required]],
      code: ['', [Validators.required]],
      discharge_date: [null, [Validators.required]],
      name: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      contract_type_id: [null, [Validators.required]],
      period_type_id: [null, [Validators.required]],
      real_daily_salary: [null, [Validators.required]],
      imss_daily_salary: [null, [Validators.required]],
      contribution_base_salary: [null, [Validators.required]],
      contribution_base_id: [null, [Validators.required]],
      department_id: [null, []],
      job_id: [null, []],
      employee_type_id: [null, [Validators.required]],
      payment_method_id: [null, [Validators.required]],
      work_shift_id: [null, [Validators.required]],
      number_afore: [null, [Validators.required]],
      social_security_number: [null, [Validators.required]],
      rfc: [null, [Validators.required]],
      curp: [null, [Validators.required]],
      sex_id: [null, [Validators.required]],
      birth_city: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
      umf: ['',[]],
      fathers_name: ['',[]],
      mothers_name: ['',[]],
      current_address: ['',[]],
      current_population: ['',[]],
      current_state: ['',[]],
      cp: ['',[]],
      telephone: ['',[]],
      back_electronic_payment: ['',[]],
      acount_number: ['',[]],
      branch_office: ['',[]],
      fonacot_number: ['',[]],
      email: ['',[Validators.email]],
      key_account: ['',[]],
      state: ['',[]],
      infonavit_credit_number: ['',[]],
      discount_type_id: [null,[]],
      monthly_factor: ['',[]],
    })

  }

  ngOnInit() {
    this.loadAllCompanies()
  }

  get c(){ return this.workForm.controls }

  ChangeCompany()
  {
    console.log('change');
    this.loader_data = true
    this.sharedServices.getCatalogsFromCompany(this.workForm.value.company_id)
    .subscribe(
    res => {
      console.log(res)
      this.loader_data = false
      this.contract_types_list = res.data.contract_types_list
      this.contract_types_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})

      this.period_types_list = res.data.period_types_list
      this.period_types_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})

      this.conribution_bases_list = res.data.conribution_bases_list
      this.conribution_bases_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})

      this.departments_list = res.data.departments_list
      this.departments_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})

      this.employee_types_list = res.data.employee_types_list
      this.employee_types_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})

      this.payment_methods_list = res.data.payment_methods_list
      this.payment_methods_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})

      this.work_shifts_list = res.data.work_shifts_list
      this.work_shifts_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})

      this.discount_types_list = res.data.discount_types_list
      this.discount_types_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})
    },
    error => {
      console.log(error.error.message)
      this.loader_data = false
      Swal.fire('¡Error!', error.error.message, 'warning')
    })
  }//ChangeCompany()

  ChangeDepartment()
  {
    this.loader_data = true
    this.sharedServices.getJobsFromDepartment(this.workForm.value.company_id, this.workForm.value.department_id)
    .subscribe(
    res => {
      console.log(res)
      this.loader_data = false
      this.jobs_list = res.data
      this.jobs_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null, department: null, department_id:null})
      if(this.jobs_list.length == 0){
        Swal.fire('¡Atención!', res.message, 'warning')
      }
    },
    error => {
      console.log(error.error.message)
      this.loader_data = false
      Swal.fire('¡Error!', error.error.message, 'warning')
    })
  }//ChangeDepartment()

  loadAllCompanies()
  {
    this.loader_data = true
    this.sharedServices.getCompanyCatalogFromUser()
    .subscribe(
    res => {
      console.log(res)
      this.loader_data = false
      this.company_list = res.data
      this.company_list.unshift({id: null, name: 'Selecione una empresa...', contact: '', rfc: '', telephone: ''})
      if(this.company_list.length == 0){
        Swal.fire('¡Atención!', res.message, 'warning')
      }
    },
    error => {
      console.log(error.error.message)
      this.loader_data = false
      Swal.fire('¡Error!', error.error.message, 'warning')
    })
  }//loadAllCompanies()

  onSubmit()
  {
    console.log(this.workForm.value)
    this.submitted = true
    if (this.workForm.invalid) {
      return;
    } else {
      let discharge_date = this.workForm.value.discharge_date
      this.workForm.value.discharge_date = discharge_date.year+'-'+discharge_date.month+'-'+discharge_date.day

      let birth_date = this.workForm.value.birth_date
      this.workForm.value.birth_date = birth_date.year+'-'+birth_date.month+'-'+birth_date.day

      console.log(this.workForm.value)

      this.loader_data = true
      this.employeeServices
      .saveEmployee(this.workForm.value)
      .subscribe(
        (res) => {
          console.log(res)
          this.loader_data = false
          Swal.fire('¡Éxito!', res.message, 'success')
        },
        error => {
          this.loader_data = false
          Swal.fire('¡Error!', error.error.message, 'error')
        })

    }
  }//

}////
