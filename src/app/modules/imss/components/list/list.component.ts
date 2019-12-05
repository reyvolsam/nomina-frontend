import { Component, OnInit } from '@angular/core';
import { Imss } from 'src/app/models/Imss';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ImssService } from 'src/app/services/imss-services/imss.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentUser: User

  list: Imss[] = []
  list_loader:Boolean = false

  imss: Imss = {
    id: null,
    date: '',
    period: '',
    imss: '',
    infonavit: '',
    impuesto: '',
    pago_imss: '',
    pago_impuesto: '',
    loader: false,
    created_at: '',
    updated_at: '',
    deleted_at: ''
  }

  constructor(
    private authService: AuthService,
    private imssService:ImssService,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x)

    modalConfig.backdrop = 'static'
    modalConfig.keyboard = false
  }

  ngOnInit() {
    this.get()
  }

  get()
  {
    this.list = []
    this.list_loader = true
    this.imssService.get()
      .subscribe(
        res => {
          console.log(res)
          this.list_loader = false
          this.list = res.data
          if(res.data.length == 0){
            Swal.fire('¡Atención!', res.message, 'warning')
          }
        },
        error => {
          console.log(error.error.message)
          this.list_loader = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }//getCampusList()

  open()
  {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.formData = this.imss
    modalRef.result.then(result => result ? this.get() : false)
  }//open()

  edit(i)
  {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' })
    modalRef.componentInstance.formData = this.list[i]
    modalRef.result.then(result => result ? this.get() : false)
  }//edit()

  delete(i)
  {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este Recibo?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.imssService.delete(this.list[i].id)
        .subscribe(
          res => {
            console.log(res)
            this.list[i].loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.get()
          },
          error => {
            console.log(error.error.message)
            this.list[i].loader = false
            Swal.fire('¡Error!', error.error.message, 'warning')
          })
      } else {
        Swal.fire('', 'Recibo no eliminado', 'warning')
      }
    })
  }//delete()

}//
