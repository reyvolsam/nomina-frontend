import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
    ) {
      this.form = this.formBuilder.group({
        id: [],
        name: ['', [Validators.required]],
        contact: ['', [Validators.required]],
        rfc: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        loader: [],
        created_at: [],
        updated_at: [],
        deleted_at: []
      })
    }//

  ngOnInit(){
    this.form.setValue(this.formData)
  }
  
  get c(){ return this.form.controls }

  onSubmit()
  {
    this.submitted = true
    if (this.form.invalid) {
      return;
    } else {
      this.loader = true
      if(this.form.value.id === null){
        this.companyService
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
        this.companyService
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

}////
