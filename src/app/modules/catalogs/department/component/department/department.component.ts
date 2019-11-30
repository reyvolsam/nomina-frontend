import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/department/department.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  currentUser: User
  
  list: Department[] = []
  list_loader:Boolean = false

  department:Department = {
    id: null,
    name: '',
    company_id: null,
    company: null,
    loader: false,
    created_at: '',
    updated_at: '',
    deleted_at: ''
  }
  create_loader:Boolean = false

  constructor(
    private authService: AuthService,
    private departmentService: DepartmentService,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x)

    modalConfig.backdrop = 'static'
    modalConfig.keyboard = false
   }

  ngOnInit() {
    this.getList()
  }

  getList()
  {
    this.list = []
    this.list_loader = true
    this.departmentService.get()
      .subscribe(
        res => {
          console.log(res)
          this.list_loader = false
          this.list = res.data
          if(this.list.length == 0){
            Swal.fire('¡Atención!', res.message, 'warning')
          }
        },
        error => {
          console.log(error.error.message)
          this.list_loader = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }//()

  open(){
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.department
    modalRef.result.then(result => result ? this.getList() : false)
  }

  edit(i){
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.formData = this.list[i]
    modalRef.result.then(result => result ? this.getList() : false)
  }

  delete(i)
  {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este Departamento?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.departmentService.delete(this.list[i].id)
        .subscribe(
          res => {
            console.log(res)
            this.list[i].loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.getList()
          },
          error => {
            console.log(error.error.message)
            this.list[i].loader = false
            Swal.fire('¡Error!', error.error.message, 'warning')
          })
      } else {
        Swal.fire('', 'Departamento no eliminado', 'warning')
      }
    })
  }//delete()

}
