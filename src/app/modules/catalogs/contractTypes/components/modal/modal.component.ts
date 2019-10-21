import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContractTypesService } from 'src/app/services/contractTypes/contractTypes.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { SharedServices } from 'src/app/services/shared-services/shared-services.service';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  form: FormGroup
  submitted:Boolean = false
  loader:Boolean = false
  loader_data: Boolean = true

  companies_list: Company[] = []

  constructor(
    private sharedServices: SharedServices,
    private contractTypesService: ContractTypesService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
    ) {
      this.form = this.formBuilder.group({
        id: [],
        name: ['', [Validators.required]],
        company_id: ['', [Validators.required]],
        company: [],
        loader: [],
        created_at: [],
        updated_at: [],
        deleted_at: []
      })
    }//

  ngOnInit(){
    this.form.setValue(this.formData)
    this.getCompanyCatalogFromUser()
  }

  get c(){ return this.form.controls }

  getCompanyCatalogFromUser()
  {
    this.loader_data = true
    this.sharedServices.getCompanyCatalogFromUser()
      .subscribe(
        res => {
          console.log(res)
          this.loader_data = false
          this.companies_list = res.data
          this.companies_list.unshift({id: null, name: 'Seleccione una empresa...', contact: '', rfc: '', telephone: ''})
          if(this.companies_list.length == 0){
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
        this.contractTypesService
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
        this.contractTypesService
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
  }//contractTypes()

  Close()
  {
    this.activeModal.close(false)
  }

}////
