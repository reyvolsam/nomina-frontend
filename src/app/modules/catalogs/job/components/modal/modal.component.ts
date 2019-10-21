import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/models/Company';
import { SharedServices } from 'src/app/services/shared-services/shared-services.service';
import { JobServices } from 'src/app/services/job-services/job-services.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Department } from 'src/app/models/Department';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  form: FormGroup
  submitted: Boolean = false
  loader: Boolean = false
  loader_data: Boolean = true

  companies_list: Company[] = []
  departments_list: Department[] = []

  constructor(
    private sharedServices: SharedServices,
    private jobService: JobServices,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      company_id: ['', [Validators.required]],
      company: [''],
      department: [''],
      department_id: [''],
      loader: [],
      created_at: [],
      updated_at: [],
      deleted_at: []
    })
  }

  ngOnInit() {
    this.form.setValue(this.formData)
    this.getCompanyCatalogFromUserDepartments()
  }

  get c(){ return this.form.controls }

  getCompanyCatalogFromUserDepartments()
  {
    this.loader_data = true
    this.sharedServices.getCompanyCatalogFromUserDepartments()
      .subscribe(
        res => {
          console.log(res)
          this.loader_data = false
          this.companies_list = res.data.companies_list
          this.companies_list.unshift({id: null, name: 'Seleccione una empresa...', contact: '', rfc: '', telephone: ''})

          this.departments_list = res.data.departments_list
          this.departments_list.unshift({id: null, name: 'Seleccione un departamento...', company_id: null, company: null})

          if(this.companies_list.length == 0 || this.departments_list.length == 0){
            Swal.fire('¡Atención!', res.message, 'warning')
          }
        },
        error => {
          console.log(error.error.message)
          this.loader_data = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }

  onSubmit()
  {
    this.submitted = true
    if (this.form.invalid) {
      return;
    } else {
      this.loader = true
      if(this.form.value.id === null){
        this.jobService
        .store(this.form.value)
        .subscribe(
          (res) => {
            console.log(res)
            this.loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.activeModal.close(true)
          },
          error => {
            this.loader = false
            Swal.fire('¡Error!', error.error.message, 'error')
          })
      } else {
        this.jobService
        .update(this.form.value)
        .subscribe(
          (res) => {
            console.log(res)
            this.loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.activeModal.close(true)
          },
          error => {
            this.loader = false
            Swal.fire('¡Error!', error.error.message, 'error')
          })
      }
    }
  }//CreateCampus()

  Close()
  {
    this.activeModal.close(false)
  }

}
