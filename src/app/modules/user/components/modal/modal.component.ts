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

  companies_list_search: Company[] = []
  assigned_companies: Company[] = []
  search_text = ''
  loader_company_search = false

  active_options = [{id: 1, name: 'Sí'}, {id: 0, name: 'No'}];

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
      group_id: [true, [Validators.required]],
      default_company_id: [1, [Validators.required]],
      active: [1, [Validators.required]],
      assigned_companies: [],
      group: [],
      loader: []
    })

  }

  ngOnInit() {
    this.userForm.setValue(this.formData)
    this.getGroups()
    // this.assigned_companies.push({id: null, name: 'Selecione una empresa...', contact: '', rfc: '', telephone: ''})
  }

  get c(){ return this.userForm.controls }

  searchForCompany()
  {

    if(this.search_text.length > 0){
      this.companies_list_search = []
      this.loader_company_search = true
      this.userService.getCompanies(this.search_text)
      .subscribe(
      res => {
        this.loader_company_search = false
        console.log(res)
        this.companies_list_search = res.data
        if(this.companies_list_search.length == 0){
          Swal.fire('¡Atención!', res.message, 'warning')
        }
      },
      error => {
        console.log(error.error.message)
        this.loader_company_search = false
        this.loader_data = false
        Swal.fire('¡Error!', error.error.message, 'warning')
      })
    }
  }//searchForCompany()

  AssignCompanyToUser(ind)
  {
    let passed = this.assigned_companies.filter(el => el.id == this.companies_list_search[ind].id)
    if(passed.length == 0){
      this.assigned_companies.push(this.companies_list_search[ind])
    } else {
      Swal.fire('Atención!', 'El usuario ya tiene asignado esta empresa.', 'warning')
    }
  }

  UnassignCompanyToUser(ind)
  {
    this.assigned_companies.splice(ind, 1)
  }

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

  onSubmit()
  {
    this.userForm.value.assigned_companies = this.assigned_companies

    console.log(this.userForm.value)
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
