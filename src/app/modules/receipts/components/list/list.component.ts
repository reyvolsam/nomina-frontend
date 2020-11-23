import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Receipts } from 'src/app/models/Receipts';
import { AuthService } from 'src/app/services/auth.service';
import { ReceiptsService } from 'src/app/services/receipts-services/receipts.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentUser: User

  list: Receipts[] = []
  list_loader: boolean = false

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

  isCollapsed: boolean = true;
  formSearch: FormGroup;

  constructor(
    private authService: AuthService,
    private receiptsService: ReceiptsService,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig,
    private fb: FormBuilder
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x)

    modalConfig.backdrop = 'static'
    modalConfig.keyboard = false
  }

  ngOnInit() {
    this.createFormSearch();
    this.get()
  }

  createFormSearch() {
    this.formSearch = this.fb.group({
      date: [null],
      period: [null],
      obra: [null]

    })
  }

  get() {
    this.list = []
    this.list_loader = true
    this.receiptsService.get()
      .subscribe(
        res => {
          console.log(res)
          this.list_loader = false
          this.list = res.data
          if (res.data.length == 0) {
            Swal.fire('¡Atención!', res.message, 'warning')
          }
        },
        error => {
          console.log(error.error.message)
          this.list_loader = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }//getCampusList()

  search() {

    let period = this.formSearch.get('period').value;
    let date = this.formSearch.get('date').value;
    let obra = this.formSearch.get('obra').value;

    if (period != null || date != null || obra != null) {
      this.list = [];
      this.list_loader = true;
      console.log('servicio buscar');
      this.receiptsService.searchReceipt(this.formSearch.value).subscribe((res: any) => {

        if (res.data.length > 0) {
          this.list = res.data;
        } else {
          this.list = [];
          Swal.fire('Atención', res.message, 'info');
        }
        this.list_loader = false;
      }, error => {
        this.list_loader = false;
        Swal.fire('Error', error.error.message, 'error');
      })

    } else {
      Swal.fire('Atención', 'Debe llenar al menos un campo para realizar la busqueda.', 'info')
    }

  }

  cleanSearch() {
    this.get();
    this.createFormSearch();
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.receipts
    modalRef.result.then(result => result ? this.get() : false)
  }//open()

  edit(i) {
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.formData = this.list[i]
    modalRef.result.then(result => result ? this.get() : false)
  }//edit()

  delete(i) {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este Recibo?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
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
