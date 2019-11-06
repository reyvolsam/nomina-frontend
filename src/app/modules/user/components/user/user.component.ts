import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { ModalComponent } from '../modal/modal.component';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users_list:User[] = []
  user_loader:Boolean = false

  page: number = 1
  last_page:Number

  user:User = {
    id: null,
    name: '',
    email: '',
    group_id:null,
    group: '',
    default_company_id: null,
    assigned_companies: [],
    active: null,
    loader: false
  }

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    modal_config: NgbModalConfig
  ) {
    modal_config.backdrop = 'static'
    modal_config.keyboard = false
  }

  ngOnInit() {
    this.gerUsersList(this.page)
  }

  gerUsersList(page)
  {
    this.users_list = []
    this.user_loader = true

    this.userService.getUsers('?page%5Bnumber%5D='+page)
    .subscribe(
      res => {
        console.log(res)
        this.user_loader = false
        this.users_list = res.data.data
        if(this.users_list.length == 0){
          Swal.fire('¡Atención!', res.message, 'warning')
        } else {
          this.page = res.data.current_page
          this.last_page = res.data.last_page
        }
      },
      error => {
        console.log(error.error.message)
        this.user_loader = false
        Swal.fire('¡Error!', error.error.message, 'warning')
      })
  }//gerUsersList()}

  open()
  {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    if(this.user.id == null){
      this.user.active = true
    }
    modalRef.componentInstance.formData = this.user
    modalRef.result.then(result => result ? this.gerUsersList(this.page) : false)
  }//open()

  edit(i)
  {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' })
    modalRef.componentInstance.formData = this.users_list[i]
    modalRef.result.then(result => result ? this.gerUsersList(this.page) : false)
  }//edit()

  delete(i)
  {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este usuario?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.users_list[i].loader = true
        this.userService.deleteUser(this.users_list[i].id)
        .subscribe(
          res => {
            console.log(res)
            this.users_list[i].loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.gerUsersList(this.page)
          },
          error => {
            console.log(error.error.message)
            this.users_list[i].loader = false
            Swal.fire('¡Error!', error.error.message, 'warning')
          })
      } else {
        Swal.fire('', 'Usuario no eliminado', 'warning')
      }
    })
  }//delete()

}////
