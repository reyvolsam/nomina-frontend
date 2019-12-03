import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/models/Company';
import { ContractTypes } from 'src/app/models/ContractTypes';
import { PeriodTypes } from 'src/app/models/PeriodTypes';
import { ContributionBases } from 'src/app/models/ContributionBases';
import { Department } from 'src/app/models/Department';
import { Job } from 'src/app/models/Job';
import { EmployeeTypes } from 'src/app/models/EmployeeTypes';
import { MethodPayment } from 'src/app/models/MethodPayment';
import { WorkShifts } from 'src/app/models/WorkShifts';
import { DiscountTypes } from 'src/app/models/DiscountTypes';
import { Sex } from 'src/app/models/Sex';
import { SharedServices } from 'src/app/services/shared-services/shared-services.service';
import { EmployeeService } from 'src/app/services/employee-services/employee.service';
import Swal from 'sweetalert2';
import { NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../ngb-date-fr-parser-formatter';
import { Router } from '@angular/router';

@Component({
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}],
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  @Input() employee_id: Number

  button_save = ''

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

  employeeDocs = new FormData()
  ine_files = []
  address_files = []
  curp_files = []
  contract_files = []
  imss_files = []
  baja_imss_files = []
  finiquito_files = []

  ine_file_url = null
  address_file_url = null
  curp_file_url = null
  contract_file_url = null
  imss_file_url = null
  baja_imss_file_url = null
  finiquito_file_url = null

  ine_file_url_deleted = null
  address_file_url_deleted = null
  curp_file_url_deleted = null
  contract_file_url_deleted = null
  imss_file_url_deleted = null
  baja_imss_file_url_deleted = null
  finiquito_file_url_deleted = null

  constructor(
    private router: Router,
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private sharedServices: SharedServices,
    private employeeServices: EmployeeService
  ) {

    this.workForm = this.formBuilder.group({
      id: [],
      work_status_id: [],
      company_id: [null, [Validators.required]],
      code: ['', [Validators.required]],
      discharge_date: [calendar.getToday(), [Validators.required]],
      termination_date: [],
      reentry_date: [],
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
      number_afore: [null],
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
      ine_file_url: [],
      ine_file_url_deleted: [],
      address_file_url: [],
      address_file_url_deleted: [],
      curp_file_url: [],
      curp_file_url_deleted: [],
      contract_file_url: [],
      contract_file_url_deleted: [],
      imss_file_url: [],
      imss_file_url_deleted: [],
      baja_imss_file_url: [],
      baja_imss_file_url_deleted: [],
      finiquito_file_url: [],
      finiquito_file_url_deleted: [],
      created_at: [],
      updated_at: [],
      deleted_at: []
    })

   }

  ngOnInit() {

    console.log('this.employee_id', this.employee_id)
    if(this.employee_id != null){
      console.log('EDIT')
      this.button_save = 'Editar empleado'
        this.employeeServices
        .getEmployeeData(this.employee_id)
        .subscribe(
        (res) => {
          console.log(res)

          this.company_list         = res.catalogs.companies_catalog
          this.company_list.unshift({id: null, name: 'Selecione una empresa...', contact: '', rfc: '', telephone: ''})
          this.contract_types_list  = res.catalogs.contract_type_catalog
          this.contract_types_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})
          this.period_types_list    = res.catalogs.period_type_catalog
          this.period_types_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})
          this.conribution_bases_list = res.catalogs.contribution_base_catalog
          this.conribution_bases_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})
          this.departments_list     = res.catalogs.department_catalog
          this.departments_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})
          this.jobs_list            = res.catalogs.job_catalog
          this.employee_types_list  = res.catalogs.employee_type_catalog
          this.employee_types_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})
          this.payment_methods_list = res.catalogs.payment_method_catalog;
          this.payment_methods_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})
          this.work_shifts_list     = res.catalogs.work_shift_catalog;
          this.work_shifts_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})
          this.sexs_list            = res.catalogs.sex_catalog
          this.jobs_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null, department: null, department_id:null})
          this.discount_types_list  = res.catalogs.discount_type_catalog
          this.discount_types_list.unshift({id: null, name: 'Selecione una opción...', company_id: null, company: null})

          if(res.data.discharge_date != null){
            let discharge_date = res.data.discharge_date.split('-')
            res.data.discharge_date = {year: parseInt(discharge_date[0]), month: parseInt(discharge_date[1]), day: parseInt(discharge_date[2])};
          }

          if(res.data.birth_date != null){
            let birth_date = res.data.birth_date.split('-')
            res.data.birth_date = {year: parseInt(birth_date[0]), month: parseInt(birth_date[1]), day: parseInt(birth_date[2])}
          }


          if(res.data.ine_file_url != null) this.ine_file_url_deleted = false
          if(res.data.address_file_url != null) this.address_file_url_deleted = false
          if(res.datacurp_file_url != null) this.curp_file_url_deleted = false
          if(res.data.contract_file_url != null) this.contract_file_url_deleted = false
          if(res.data.imss_file_url != null) this.imss_file_url_deleted = false
          if(res.data.baja_imss_file_url != null) this.baja_imss_file_url_deleted = false
          if(res.data.finiquito_file_url != null) this.finiquito_file_url_deleted = false

          this.workForm.setValue(res.data)

          this.loader_data = false
          Swal.fire('', 'Información del empleado carga correctamente.', 'success')
        },
        error => {
          this.loader_data = false
          Swal.fire('¡Error!', error.error.message, 'error')
        })
    } else {
      console.log('CREATE')
      setTimeout(() => {
        this.loadAllCompanies()
      });
      this.button_save = 'Crear empleado'
    }

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
      if(res.data.length == 0){
        Swal.fire('¡Atención!', res.message, 'warning')
      }
    },
    error => {
      console.log(error.error.message)
      this.loader_data = false
      Swal.fire('¡Error!', error.error.message, 'warning')
    })
  }//loadAllCompanies()

  //uploadDocumentation()
  uploadDocumentation(employee_id)
  {

    if(this.ine_files.length > 0){
      if(!this.employeeDocs.get('ine_file') ) this.employeeDocs.append('ine_file', this.ine_files[0])
    }
    this.employeeDocs.append('ine_file_url_deleted', this.ine_file_url_deleted.toString() )

    if(this.address_files.length > 0){
      if(!this.employeeDocs.get('address_files') ) this.employeeDocs.append('address_files', this.address_files[0])
    }

    this.employeeDocs.append('address_file_url_deleted', this.address_file_url_deleted.toString() )

    if(this.curp_files.length > 0){
      if(!this.employeeDocs.get('curp_files') ) this.employeeDocs.append('curp_files', this.curp_files[0])
    }

    this.employeeDocs.append('curp_file_url_deleted', this.curp_file_url_deleted.toString() )

    if(this.contract_files.length > 0){
      if(!this.employeeDocs.get('contract_files') ) this.employeeDocs.append('contract_files', this.contract_files[0])
    }

    this.employeeDocs.append('contract_file_url_deleted', this.contract_file_url_deleted.toString())

    if(this.imss_files.length > 0){
      if(!this.employeeDocs.get('imss_files') ) this.employeeDocs.append('imss_files', this.imss_files[0])
    }

    this.employeeDocs.append('imss_file_url_deleted', this.imss_file_url_deleted.toString())

    if(this.baja_imss_files.length > 0){
      if(!this.employeeDocs.get('baja_imss_files') ) this.employeeDocs.append('baja_imss_files', this.baja_imss_files[0])
    }

    this.employeeDocs.append('baja_imss_file_url_deleted', this.baja_imss_file_url_deleted.toString())

    if(this.finiquito_files.length > 0){
      if(!this.employeeDocs.get('finiquito_files') ) this.employeeDocs.append('finiquito_files', this.finiquito_files[0])
    }

    this.employeeDocs.append('finiquito_file_url_deleted', this.finiquito_file_url_deleted.toString())


    this.employeeDocs.append('employee_id', employee_id)

    this.loader_data = true;
    this.employeeServices
    .uploadDoc(this.employeeDocs)
    .subscribe(
    (res) => {
      console.log(res)
      this.loader_data = false
      this.router.navigate(['/employee/all']);
      Swal.fire('¡Éxito!', res.message, 'success')
    },
    error => {
      this.loader_data = false
      Swal.fire('¡Error!', error.error.message, 'error')
    })

  }//

  deleteFileIneLoad = () => this.ine_file_url_deleted = true
  deleteFileAddressLoad = () => this.address_file_url_deleted = true
  deleteFileCurpLoad = () => this.curp_file_url_deleted = true
  deleteFileContractLoad = () => this.contract_file_url_deleted = true
  deleteFileImssLoad = () => this.imss_file_url_deleted = true
  deleteFileBajaImssLoad = () => this.baja_imss_file_url_deleted = true
  deleteFileFiniquitoLoad = () => this.baja_imss_file_url_deleted = true

  onFileSelectIne = event => { if(event.target.files.length > 0) this.ine_files.push(event.target.files[0]) }
  deleteFileIne = ind => this.ine_files.splice(ind, 1)

  onFileSelectAddress = event => { if(event.target.files.length > 0) this.address_files.push(event.target.files[0]) }
  deleteFileAddress = ind => this.address_files.splice(ind, 1)

  onFileSelectCurp = event => { if(event.target.files.length > 0) this.curp_files.push(event.target.files[0]) }
  deleteFileCurp = ind => this.curp_files.splice(ind, 1)

  onFileSelectContract = event => { if(event.target.files.length > 0) this.contract_files.push(event.target.files[0]) }
  deleteFileContract = ind => this.contract_files.splice(ind, 1)

  onFileSelectImss = event => { if(event.target.files.length > 0) this.imss_files.push(event.target.files[0]) }
  deleteFileImss = ind => this.imss_files.splice(ind, 1)

  onFileSelectBajaImss = event => { if(event.target.files.length > 0) this.baja_imss_files.push(event.target.files[0]) }
  deleteFileBajaImss = ind => this.baja_imss_files.splice(ind, 1)

  onFileSelectFiniquito = event => { if(event.target.files.length > 0) this.finiquito_files.push(event.target.files[0]) }
  deleteFileFiniquito = ind => this.finiquito_files.splice(ind, 1)

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

      if(this.employee_id != null){
        this.employeeServices
        .updateEmployee(this.workForm.value)
        .subscribe(
        (res) => {
          console.log(res)
          this.loader_data = false;
          //Swal.fire('¡Éxito!', res.message, 'success')
          this.uploadDocumentation(res.employee_id)
        },
        error => {
          this.loader_data = false
          Swal.fire('¡Error!', error.error.message, 'error')
        })
      } else {
        this.employeeServices
        .createEmployee(this.workForm.value)
        .subscribe(
        (res) => {
          console.log(res)
          this.loader_data = false
          //Swal.fire('¡Éxito!', res.message, 'success')
          this.uploadDocumentation(res.employee_id)
        },
        error => {
          this.loader_data = false
          Swal.fire('¡Error!', error.error.message, 'error')
        })
      }
    }
  }//

}////
