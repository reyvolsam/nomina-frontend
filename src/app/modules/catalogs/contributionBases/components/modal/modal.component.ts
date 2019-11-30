import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ContributionBasesService } from 'src/app/services/contributionBases/contributionBases.service';
import { Company } from 'src/app/models/Company';
import { SharedServices } from 'src/app/services/shared-services/shared-services.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  currentUser: User
  
  form: FormGroup
  submitted:Boolean = false
  loader:Boolean = false
  loader_data: Boolean = true

  companies_list: Company[] = []

  default_company_id: Number;
  
  constructor(
    private authService: AuthService,
    private sharedServices: SharedServices,
    private contributionBasesService: ContributionBasesService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
    ) {
      this.authService.currentUser.subscribe(x => this.currentUser = x)

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
    this.default_company_id = this.currentUser.default_company_id
    if(this.formData.id == null) this.formData.company_id = this.default_company_id
    
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
        this.contributionBasesService
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
        this.contributionBasesService
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
  }//()

  Close()
  {
    this.activeModal.close(false)
  }

}////
