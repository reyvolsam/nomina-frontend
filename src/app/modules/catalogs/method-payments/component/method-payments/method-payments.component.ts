import { Component, OnInit } from '@angular/core';
import { MethodPaymentService } from 'src/app/services/methodPayments/method-payment.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { MethodPayment } from 'src/app/models/MethodPayment';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-method-payments',
  templateUrl: './method-payments.component.html',
  styleUrls: ['./method-payments.component.css']
})
export class MethodPaymentsComponent implements OnInit {

  currentUser: User

  list: MethodPayment[] = []
  list_loader:Boolean = false

  methodPayment:MethodPayment = {
    id: null,
    name: '',
    description: '',
    loader: false,
    created_at: '',
    updated_at: '',
    deleted_at: ''
  }
  create_loader: Boolean = false

  constructor(
    private authService: AuthService,
    private methodPaymentService: MethodPaymentService,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x)

    modalConfig.backdrop = 'static'
    modalConfig.keyboard = false
  }

  ngOnInit() {
    this.getList()
  }//

  getList()
  {
    this.list = []
    this.list_loader = true
    this.methodPaymentService.get()
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
    modalRef.componentInstance.formData = this.methodPayment
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
      title: '¿Estas seguro de querer eliminar este Metodo de Pago?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.methodPaymentService.delete(this.list[i].id)
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
        Swal.fire('', 'Metodo de Pago no eliminado', 'warning')
      }
    })
  }//delete()
}
