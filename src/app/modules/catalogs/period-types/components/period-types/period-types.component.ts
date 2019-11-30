import { Component, OnInit } from '@angular/core';
import { PeriodTypes } from 'src/app/models/PeriodTypes';
import { PeriodTypesService } from 'src/app/services/period-types/period-types.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-period-types',
  templateUrl: './period-types.component.html',
  styleUrls: ['./period-types.component.css']
})
export class PeriodTypesComponent implements OnInit {

  currentUser: User

  list: PeriodTypes[] = []
  list_loader:Boolean = false

  periodTypes:PeriodTypes = {
    id:null,
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
    private periodTypesService: PeriodTypesService,
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
    this.periodTypesService.get()
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

  open()
  {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.periodTypes
    modalRef.result.then(result => result ? this.getList() : false)
  }//open()

  edit(i)
  {
    console.log(this.list[i].name)
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.formData = this.list[i]
    modalRef.result.then(result => result ? this.getList() : false)
  }//edit()

  delete(i)
  {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este Tipo de Periodo?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.periodTypesService.delete(this.list[i].id)
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
        Swal.fire('', 'Tipo de Periodo no eliminado', 'warning')
      }
    })
  }//delete()

}
