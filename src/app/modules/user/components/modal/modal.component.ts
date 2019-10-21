import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { GroupServices } from 'src/app/services/group-services/group-services.service';
import { Group } from 'src/app/models/Group';
import { Company } from 'src/app/models/Company';
import { SharedServices } from 'src/app/services/shared-services/shared-services.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  userForm: FormGroup
  user_submitted:Boolean = false
  loader:Boolean = false

  loader_data: Boolean = true

  companies_list: Company[] = []
  groups_list: Group[] = []

  constructor(
    private sharedServices: SharedServices,
    private groupService: GroupServices,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.userForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      group_id: [1, [Validators.required]],
      default_company_id: [],
      group: [],
      loader: []
    })

  }

  ngOnInit() {
    this.userForm.setValue(this.formData)
    this.getGroups()
    this.getCompanyCatalogFromUser()

  }

  get c(){ return this.userForm.controls }

  getGroups()
  {
    this.loader_data = true
    this.groupService.get()
    .subscribe(
      res => {
        console.log(res)
        this.loader_data = false
        this.groups_list = res.data
        this.groups_list.unshift({id: null, name: 'Seleccione un perfil...'})
        if(this.groups_list.length == 0){
          Swal.fire('¡Atención!', res.message, 'warning')
        }
      },
      error => {
        console.log(error.error.message)
        this.loader_data = false
        Swal.fire('¡Error!', error.error.message, 'warning')
      })
  }//

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
    this.user_submitted = true
    if (this.userForm.invalid) {
      return;
    } else {
      this.loader = true
      if(this.userForm.value.id === null){
        this.userService
        .saveUser(this.userForm.value)
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
        this.userService
        .updateUser(this.userForm.value)
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
  }//Close()

}////
