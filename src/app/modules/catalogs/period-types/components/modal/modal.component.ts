import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PeriodTypesService } from 'src/app/services/period-types/period-types.service';
import Swal from 'sweetalert2';
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
  
  constructor(
    private authService: AuthService,
    private sharedServices: SharedServices,
    private periodTypesService: PeriodTypesService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x)

    this.form = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      loader: [],
      created_at: [],
      updated_at: [],
      deleted_at: []
    })
   }

  ngOnInit() {
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
        this.periodTypesService
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
        this.periodTypesService
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

}
