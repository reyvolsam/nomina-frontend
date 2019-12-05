import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Receipts } from 'src/app/models/Receipts';
import { AuthService } from 'src/app/services/auth.service';
import { ReceiptsService } from 'src/app/services/receipts-services/receipts.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentUser: User

  list: Receipts[] = []
  list_loader:Boolean = false

  receipts: Receipts = {
    id: null,
    date: '',
    period: '',
    xml_payment: '',
    payment_transference_1: '',
    payment_transference_2: '',
    loader: false,
    created_at: '',
    updated_at: '',
    deleted_at: ''
  }

  constructor(
    private authService: AuthService,
    private receiptsService:ReceiptsService,
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
    this.receiptsService.get()
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
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.receipts
    modalRef.result.then(result => result ? this.get() : false)
  }//open()

  edit(i)
  {
    const modalRef = this.modalService.open(ModalComponent)
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
        this.receiptsService.delete(this.list[i].id)
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

}
