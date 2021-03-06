import { Component, OnInit, Input, HostListener, ChangeDetectorRef } from '@angular/core';
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
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Unionized } from 'src/app/models/Unionized';
import { Location } from "@angular/common";
// import { OnExitGuard, ComponentCanDeactivate } from '../../home/guard/on-exit-guard';
// import { Observable } from 'rxjs';
import { CurrentFile, NewFile } from '../../../models/OneFileManagerModel';



@Component({
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }],
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  @Input() employee_id: Number

  currentUser: User

  button_save = ''

  workForm: FormGroup
  loader_data: boolean = false
  submitted: boolean = false

  company_list: Company[] = []
  contract_types_list: ContractTypes[] = []
  period_types_list: PeriodTypes[] = []
  conribution_bases_list: ContributionBases[] = []
  departments_list: Department[] = []
  jobs_list: Job[] = []
  employee_types_list: EmployeeTypes[] = []
  payment_methods_list: MethodPayment[] = []
  work_shifts_list: WorkShifts[] = []
  sexs_list: Sex[] = [{ id: 1, name: 'Hombre' }, { id: 2, name: 'Mujer' }];
  discount_types_list: DiscountTypes[] = []
  unionized_list: Unionized[] = []

  employeeDocs = new FormData()
  ine_files = []
  address_files = []
  curp_files = []
  contract_files = []
  imss_files = []
  baja_imss_files = []
  finiquito_files = []

  employee_photo_file = null

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

  employee_photo_deleted = null

  route: string;

  employeeSaved: boolean = true;

  clickButtonSubmit: boolean = false;

  last_code = null;

  loader: boolean = false;

  //data recibida
  listAdminCurrent = [];
  listDisabilitiesCurrent = [];
  listDemandsCurrent = [];




  //data que escucha cambios
  listAdmNew = [];
  listAdminCurrentL = [];

  listDisabilitiesNewL = []
  listDisabilitiesCurrentL = []

  listDemandsNewL = []
  listDemandsCurrentL = []


  //nuevos campos
  // etapa3 
  retencionInfonavit: any= {
    file_url: null,
    file_delete: false
  }
  retencion_infonavit_file;
  retencion_infonavit_file_delete;

  rfcFile: any= {
    file_url: null,
    file_delete: false
  }
  rfc_file;
  rfc_file_delete;

  birthCertificateFile: any= {
    file_url: null,
    file_delete: false
  }

  birth_certificate_file;
  birth_certificate_file_delete;

  numberImssFile: any= {
    file_url: null,
    file_delete: false
  }

  number_imss_file;
  number_imss_file_delete;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private sharedServices: SharedServices,
    private employeeServices: EmployeeService,
    private cdref: ChangeDetectorRef,
    private employeeService: EmployeeService
  ) {

    
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = 'ATENCIÓN: Das click en Cancelar, para guardar y salir. Volver a cargar para salir sin guardar cambios.';
      console.log('evento', event);
      return event;
    });

    this.authService.currentUser.subscribe(x => this.currentUser = x)

    this.workForm = this.formBuilder.group({
      id: [],
      work_status_id: [],
      employee_photo: [],
      employee_photo_url: [null],
      company_id: [this.currentUser.default_company_id, [Validators.required]],
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
      unionized_id: [null],
      payment_method_id: [null, [Validators.required]],
      work_shift_id: [null, [Validators.required]],
      number_afore: [null],
      social_security_number: [null, [Validators.required]],
      rfc: [null, [Validators.required]],
      curp: [null, [Validators.required]],
      sex_id: [null, [Validators.required]],
      birth_city: [null, []],
      birth_date: [null, [Validators.required]],
      umf: ['', []],
      fathers_name: ['', []],
      mothers_name: ['', []],
      current_address: ['', []],
      current_population: ['', []],
      current_state: ['', []],
      cp: ['', []],
      telephone: ['', []],
      back_electronic_payment: ['', []],
      acount_number: ['', []],
      branch_office: ['', []],
      fonacot_number: ['', []],
      email: ['', [Validators.email]],
      key_account: ['', []],
      state: ['', []],
      infonavit_credit_number: ['', []],
      discount_type_id: [null, []],
      monthly_factor: ['', []],
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
      rfc_url: [],
      rfc_url_deleted: [],
      birth_certificate_url: [],
      birth_certificate_url_deleted: [],
      number_imss_url: [],
      number_imss_url_delete:[],
      baja_imss_date: [],
      causa_baja: [],
      observations_baja: [],
      created_at: [],
      updated_at: [],
      deleted_at: []
    })

  }



  ngOnInit() {

    if (this.employee_id != null) {
      console.log('EDIT')
      this.button_save = 'Editar empleado'
      this.employeeServices
        .getEmployeeData(this.employee_id)
        .subscribe(
          (res) => {
            console.log(res)

            this.last_code = res.last_code;
            this.company_list = res.catalogs.companies_catalog
            this.company_list.unshift({ id: null, name: 'Selecione una empresa...', contact: '', rfc: '', telephone: '' })
            this.contract_types_list = res.catalogs.contract_type_catalog
            this.contract_types_list.unshift({ id: null, name: 'Selecione una opción...', description: '' })
            this.period_types_list = res.catalogs.period_type_catalog
            this.period_types_list.unshift({ id: null, name: 'Selecione una opción...' })
            this.conribution_bases_list = res.catalogs.contribution_base_catalog
            this.conribution_bases_list.unshift({ id: null, name: '', description: 'Selecione una opción...' })
            this.departments_list = res.catalogs.department_catalog
            this.departments_list.unshift({ id: null, name: 'Selecione una opción...', company_id: null, company: null })
            this.jobs_list = res.catalogs.job_catalog
            this.employee_types_list = res.catalogs.employee_type_catalog
            this.employee_types_list.unshift({ id: null, name: 'Selecione una opción...',  })
            this.payment_methods_list = res.catalogs.payment_method_catalog;
            this.payment_methods_list.unshift({ id: null, name: '', description: 'Selecione una opción...',  })
            this.work_shifts_list = res.catalogs.work_shift_catalog;
            this.work_shifts_list.unshift({ id: null, name: 'Selecione una opción...', })
            this.sexs_list = res.catalogs.sex_catalog
            this.jobs_list.unshift({ id: null, name: 'Selecione una opción...', company_id: null, company: null, department: null, department_id: null })
            this.discount_types_list = res.catalogs.discount_type_catalog
            this.discount_types_list.unshift({ id: null, name: 'Selecione una opción...'})
            this.unionized_list = res.catalogs.unionized_list
            this.unionized_list.unshift({ id: null, name: '', description: 'Selecione una opción...' });


            //setean listas de archivos
            // etapa3 
            this.listAdminCurrent = res.incidents.administrative_files_current;
            this.listDisabilitiesCurrent = res.incidents.disabilitie_files_current;
            this.listDemandsCurrent = res.incidents.demand_files_current;

            this.retencionInfonavit.file_url = res.data.retencion_infonavit_url;
            this.retencionInfonavit.file_delete = res.data.retencion_infonavit_url_delete;

            this.rfcFile.file_url = res.data.rfc_url;
            this.rfcFile.file_delete = res.data.rfc_url_delete;

            this.birthCertificateFile.file_url = res.data.birth_certificate_url;
            this.birthCertificateFile.file_delete = res.data.birth_certificate_url_delete;

            this.numberImssFile.file_url = res.data.number_imss_url;
            this.numberImssFile.file_delete = res.data.number_imss_url_delete;


            //################

            if (res.data.discharge_date != null) {
              let discharge_date = res.data.discharge_date.split('-')
              res.data.discharge_date = { year: parseInt(discharge_date[0]), month: parseInt(discharge_date[1]), day: parseInt(discharge_date[2]) };
            }

            if (res.data.birth_date != null) {
              let birth_date = res.data.birth_date.split('-')
              res.data.birth_date = { year: parseInt(birth_date[0]), month: parseInt(birth_date[1]), day: parseInt(birth_date[2]) }
            }

            if (res.data.baja_imss_date != null) {
              let baja_imss_date = res.data.baja_imss_date.split('-')
              res.data.baja_imss_date = { year: parseInt(baja_imss_date[0]), month: parseInt(baja_imss_date[1]), day: parseInt(baja_imss_date[2]) }
            }

            if (res.data.ine_file_url != null) this.ine_file_url_deleted = false
            if (res.data.address_file_url != null) this.address_file_url_deleted = false
            if (res.data.curp_file_url != null) this.curp_file_url_deleted = false
            if (res.data.contract_file_url != null) this.contract_file_url_deleted = false
            if (res.data.imss_file_url != null) this.imss_file_url_deleted = false
            if (res.data.baja_imss_file_url != null) this.baja_imss_file_url_deleted = false
            if (res.data.finiquito_file_url != null) this.finiquito_file_url_deleted = false

            this.workForm.patchValue(res.data)
            console.log('patch values form', this.workForm.value);

            this.loader_data = false
            Swal.fire('', 'Información del empleado carga correctamente.', 'success')
          },
          error => {
            this.loader_data = false
            Swal.fire('¡Error!', error.error.message, 'error')
          })
    } else {
      console.log('CREATE')
      setTimeout(() => this.loadAllCompanies());

      this.button_save = 'Crear empleado'
    }

  }

  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }

  get c() { return this.workForm.controls }
  get companieRequired() { return this.workForm.get('company_id').invalid }

  ChangeCompany() {
    console.log('change', this.workForm.value.company_id);
    this.loader_data = true
    this.sharedServices.getCatalogsFromCompany(this.workForm.value.company_id)
      .subscribe(
        res => {
          console.log(res)
          this.loader_data = false

          this.contract_types_list = res.data.contract_types_list
          this.contract_types_list.unshift({ id: null, name: 'Selecione una opción...', description: '' })

          this.period_types_list = res.data.period_types_list
          this.period_types_list.unshift({ id: null, name: 'Selecione una opción...' })

          this.conribution_bases_list = res.data.conribution_bases_list
          this.conribution_bases_list.unshift({ id: null, name: '', description: 'Selecione una opción...' })

          this.departments_list = res.data.departments_list
          this.departments_list.unshift({ id: null, name: 'Selecione una opción...', company_id: null, company: null })

          this.employee_types_list = res.data.employee_types_list
          this.employee_types_list.unshift({ id: null, name: 'Selecione una opción...' })

          this.payment_methods_list = res.data.payment_methods_list
          this.payment_methods_list.unshift({ id: null, name: '', description: 'Selecione una opción...' })

          this.work_shifts_list = res.data.work_shifts_list
          this.work_shifts_list.unshift({ id: null, name: 'Selecione una opción...' })

          this.discount_types_list = res.data.discount_types_list
          this.discount_types_list.unshift({ id: null, name: 'Selecione una opción...' })

          this.unionized_list = res.data.unionized_list
          this.unionized_list.unshift({ id: null, name: '', description: 'Selecione una opción...' })
        },
        error => {
          console.log(error.error.message)
          this.loader_data = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }//ChangeCompany()

  ChangeDepartment() {
    this.loader_data = true
    this.sharedServices.getJobsFromDepartment(this.workForm.value.company_id, this.workForm.value.department_id)
      .subscribe(
        res => {
          console.log(res)
          this.loader_data = false
          this.jobs_list = res.data
          this.jobs_list.unshift({ id: null, name: 'Selecione una opción...', company_id: null, company: null, department: null, department_id: null })
          if (this.jobs_list.length == 0) {
            Swal.fire('¡Atención!', res.message, 'warning')
          }
        },
        error => {
          console.log(error.error.message)
          this.loader_data = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }//ChangeDepartment()

  loadAllCompanies() {
    this.loader_data = true
    this.sharedServices.getCompanyCatalogFromUser()
      .subscribe(
        res => {
          console.log(res)
          this.last_code = res.last_code;
          this.loader_data = false
          this.company_list = res.data
          this.company_list.unshift({ id: null, name: 'Selecione una empresa...', contact: '', rfc: '', telephone: '' })
          if (res.data.length == 0) {
            Swal.fire('¡Atención!', res.message, 'warning')
          }

          if (this.employee_id == null) {
            this.workForm.patchValue({ company_id: this.currentUser.default_company_id })
            setTimeout(() => this.ChangeCompany())
          }
        },
        error => {
          console.log(error.error.message)
          this.loader_data = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }//loadAllCompanies()

  //uploadDocumentation()
  uploadDocumentation(employee_id) {

    if (this.ine_files.length > 0) {
      if (!this.employeeDocs.get('ine_file')) this.employeeDocs.append('ine_file', this.ine_files[0])
    }
    (this.ine_file_url_deleted != null) ? this.employeeDocs.append('ine_file_url_deleted', this.ine_file_url_deleted.toString()) : false

    if (this.address_files.length > 0) {
      if (!this.employeeDocs.get('address_files')) this.employeeDocs.append('address_files', this.address_files[0])
    }

    (this.address_file_url_deleted != null) ? this.employeeDocs.append('address_file_url_deleted', this.address_file_url_deleted.toString()) : false

    if (this.curp_files.length > 0) {
      if (!this.employeeDocs.get('curp_files')) this.employeeDocs.append('curp_files', this.curp_files[0])
    }

    (this.curp_file_url_deleted != null) ? this.employeeDocs.append('curp_file_url_deleted', this.curp_file_url_deleted.toString()) : false

    if (this.contract_files.length > 0) {
      if (!this.employeeDocs.get('contract_files')) this.employeeDocs.append('contract_files', this.contract_files[0])
    }

    (this.contract_file_url_deleted != null) ? this.employeeDocs.append('contract_file_url_deleted', this.contract_file_url_deleted.toString()) : false

    if (this.imss_files.length > 0) {
      if (!this.employeeDocs.get('imss_files')) this.employeeDocs.append('imss_files', this.imss_files[0])
    }

    (this.imss_file_url_deleted != null) ? this.employeeDocs.append('imss_file_url_deleted', this.imss_file_url_deleted.toString()) : false

    if (this.baja_imss_files.length > 0) {
      if (!this.employeeDocs.get('baja_imss_files')) this.employeeDocs.append('baja_imss_files', this.baja_imss_files[0])
    }

    (this.baja_imss_file_url_deleted != null) ? this.employeeDocs.append('baja_imss_file_url_deleted', this.baja_imss_file_url_deleted.toString()) : false

    if (this.finiquito_files.length > 0) {
      if (!this.employeeDocs.get('finiquito_files')) this.employeeDocs.append('finiquito_files', this.finiquito_files[0])
    }

    (this.finiquito_file_url_deleted != null) ? this.employeeDocs.append('finiquito_file_url_deleted', this.finiquito_file_url_deleted.toString()) : false;

    if (this.employee_photo_file != null) {
      if (!this.employeeDocs.get('employee_photo')) this.employeeDocs.append('employee_photo', this.employee_photo_file)
    }

    //Nuevos campos
    // etapa3 
    if (this.retencion_infonavit_file != null) {
       this.employeeDocs.append('retencion_infonavit_file', this.retencion_infonavit_file)
    }

    this.employeeDocs.append('retencion_infonavit_url_deleted', `${this.retencion_infonavit_file_delete}`)

    // rfc
    if (this.rfc_file != null) {
        this.employeeDocs.append('rfc_file', this.rfc_file)
    }

    this.employeeDocs.append('rfc_url_deleted', `${this.rfc_file_delete}`)
    // rfc 

    // birth_certificate
    if (this.birth_certificate_file != null) {
      this.employeeDocs.append('birth_certificate_file', this.birth_certificate_file)
    }

    this.employeeDocs.append('birth_certificate_url_deleted', `${this.birth_certificate_file_delete}`)
    // birth_certificate

    // number_imss
    if (this.number_imss_file != null) {
      this.employeeDocs.append('number_imss_file', this.number_imss_file)
    }

    this.employeeDocs.append('number_imss_url_deleted', `${this.number_imss_file_delete}`)
    // number_imss



    //################

    this.employeeDocs.append('employee_id', employee_id)

    this.loader_data = true;
    this.employeeServices
      .uploadDoc(this.employeeDocs)
      .subscribe(
        (res) => {
          console.log(res)
          this.loader_data = false
          // aqui 
          this.location.back();
          // this.router.navigate(['/employee/all']);
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
  deleteFileFiniquitoLoad = () => this.finiquito_file_url_deleted = true

  onFileSelectIne = event => { if (event.target.files.length > 0) this.ine_files.push(event.target.files[0]) }
  deleteFileIne = ind => this.ine_files.splice(ind, 1)

  onFileSelectAddress = event => { if (event.target.files.length > 0) this.address_files.push(event.target.files[0]) }
  deleteFileAddress = ind => this.address_files.splice(ind, 1)

  onFileSelectCurp = event => { if (event.target.files.length > 0) this.curp_files.push(event.target.files[0]) }
  deleteFileCurp = ind => this.curp_files.splice(ind, 1)

  onFileSelectContract = event => { if (event.target.files.length > 0) this.contract_files.push(event.target.files[0]) }
  deleteFileContract = ind => this.contract_files.splice(ind, 1)

  onFileSelectImss = event => { if (event.target.files.length > 0) this.imss_files.push(event.target.files[0]) }
  deleteFileImss = ind => this.imss_files.splice(ind, 1)

  onFileSelectBajaImss = event => { if (event.target.files.length > 0) this.baja_imss_files.push(event.target.files[0]) }
  deleteFileBajaImss = ind => this.baja_imss_files.splice(ind, 1)

  onFileSelectFiniquito = event => { if (event.target.files.length > 0) this.finiquito_files.push(event.target.files[0]) }
  deleteFileFiniquito = ind => this.finiquito_files.splice(ind, 1)

  onFileSelectEmployeePhoto = event => { if (event.target.files.length > 0) this.employee_photo_file = event.target.files[0] }
  onSelectFileDeleteEmployeePhoto = () => this.employee_photo_file = null


  //nuevos campos incidencias
  changeListNewAdmin(event: any) { this.listAdmNew = event; }
  listenerCurrentAdminFiles(ev) { this.listAdminCurrentL = ev; }

  changeListNewDisabilities(event: any) { this.listDisabilitiesNewL = event; }
  listenerCurrentDisabilitiesFiles(ev) { this.listDisabilitiesCurrentL = ev; }

  changeListNewDemands(event: any) { this.listDemandsNewL = event; }
  listenerCurrentDemandsFiles(ev) { this.listDemandsCurrentL = ev; }


  //nuevos campos incidencias fin


  //#######################3
  // etapa3 
  changeNewFile(ev:NewFile){
    console.log('New', ev)
    switch (ev.fileType) {
      case 'infonavit':
        this.retencion_infonavit_file = ev.file;
        break;
    
      case 'rfc':
        this.rfc_file = ev.file
        break;

      case 'birth_certificate':
        this.birth_certificate_file = ev.file
        break;
      
        case 'number_imss':
        this.number_imss_file = ev.file
        break;
    }
    
  }

  changeDeleteCurrentFile(ev:CurrentFile){
    console.log('delete', ev)
    switch (ev.fileType) {
      case 'infonavit':
        this.retencion_infonavit_file_delete = ev.fileDelete;
        break;

      case 'rfc':
        this.rfc_file_delete = ev.fileDelete;
        break;

      case 'birth_certificate':
        this.birth_certificate_file_delete = ev.fileDelete;
        break;

      case 'number_imss':
        this.number_imss_file_delete = ev.fileDelete;
        break;
    
    }
  }
  //#################3


  // convertEmployeeToActive()
  // {
  //   Swal.fire({
  //     title: '¿Estas seguro de convertir este empleado?',
  //     text: "",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Sí, ¡Convertir!',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if(result.value){
  //       this.sharedServices.loadingSwal();
  //       this.employeeService.convertEmployee(3, this.employee_id)
  //       .subscribe(
  //       res => {
  //         console.log(res)
  //         Swal.close();
  //         // this.loader = false

  //           // this.getEmployeesByStatus(this.page)

  //       },
  //       error => {
  //         console.log(error.error.message)
  //         // this.employees_list[ind].loader = false
  //         Swal.fire('¡Error!', error.error.message, 'error')
  //       })
  //     } else {
  //       Swal.fire('Atención', 'Empleado no convertido.', 'warning')
  //     }
  //   })
  // }//

  onSubmit() {
    console.log(this.workForm.value)
    // this.uploadFilesIncidents();
    this.submitted = true
    if (this.workForm.invalid) {
      Swal.fire('¡Error!', 'Falta información obligatoria', 'error')
      return;
    } else {
      if (this.workForm.value.discharge_date != null) {
        let discharge_date = this.workForm.value.discharge_date
        this.workForm.value.discharge_date = discharge_date.year + '-' + discharge_date.month + '-' + discharge_date.day
      }

      if (this.workForm.value.birth_date != null) {
        let birth_date = this.workForm.value.birth_date
        this.workForm.value.birth_date = birth_date.year + '-' + birth_date.month + '-' + birth_date.day
      }

      if (this.workForm.value.baja_imss_date != null) {
        let baja_imss_date = this.workForm.value.baja_imss_date
        this.workForm.value.baja_imss_date = baja_imss_date.year + '-' + baja_imss_date.month + '-' + baja_imss_date.day
      }

      console.log(this.workForm.value)

      this.loader_data = true

      if (this.employee_id != null) {
        this.employeeServices
          .updateEmployee(this.workForm.value)
          .subscribe(
            (res) => {
              console.log(res)
              console.log("CLICK BOTON SUBMIT")
              this.loader_data = false;
              //Swal.fire('¡Éxito!', res.message, 'success')
              this.uploadDocumentation(res.employee_id)
              this.uploadFilesIncidents(res.employee_id).then((val: any) => {
                console.log('termino de upload incidentes', val);
              });
              this.clickButtonSubmit = true
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
              this.uploadFilesIncidents(res.employee_id);
            },
            error => {
              this.loader_data = false
              Swal.fire('¡Error!', error.error.message, 'error')
            })
      }
    }
  }//

  convertEmployee() {
    Swal.fire({
      title: '¿Estas seguro de conevetir este empleado?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Convertir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.employeeServices.convertEmployee(3, this.workForm.value.id)
          .subscribe(
            res => {
              console.log(res)
              this.location.back();
              // this.router.navigate(['/employee/procesoActivo']);
              Swal.fire('¡Éxito!', 'Empleado convertido a Activo correctamente.', 'success')
            },
            error => {
              console.log(error.error.message)
              Swal.fire('¡Error!', error.error.message, 'warning')
            })
      } else {
        Swal.fire('Atención', 'Empleado no convertido.', 'warning')
      }
    })
  }

  async uploadFilesIncidents(id: number = null) {

    let objSend = {
      employee_id: id,
      administrative_files_new: [],
      administrative_files_current: [],

      disabilitie_files_new: [],
      disabilitie_files_current: [],

      demand_files_new: [],
      demand_files_current: [],

    }

    objSend.administrative_files_new = this.listAdmNew;
    objSend.administrative_files_current = this.listAdminCurrentL;

    objSend.disabilitie_files_new = this.listDisabilitiesNewL;
    objSend.disabilitie_files_current = this.listDisabilitiesCurrentL;

    objSend.demand_files_new = this.listDemandsNewL;
    objSend.demand_files_current = this.listDemandsCurrentL;

    console.log('objeto de incidencias a enviar', objSend);

    this.employeeServices.uploadFilesIncidents(objSend).subscribe((res: any) => {
      console.log('servicio uploadFilesIncidents', res);
    }, error => {
      Swal.fire('Error', error.error.message, 'error');
    })

  }



  /*@HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if(this.clickButtonSubmit == false){
      return true
    } else {
      return false
    }
  }*/
}////
