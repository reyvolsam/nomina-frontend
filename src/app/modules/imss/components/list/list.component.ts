import { Component, OnInit } from '@angular/core';
import { Imss } from 'src/app/models/Imss';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ImssService } from 'src/app/services/imss-services/imss.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDownloadFilesComponent } from 'src/app/modules/shared/components/modal-download-files/modal-download-files.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentUser: User

  list: Imss[] = []
  list_loader: boolean = false

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
  isCollapsed: boolean = true;

  formSearch: FormGroup


  constructor(
    private authService: AuthService,
    private imssService: ImssService,
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
    this.imssService.get()
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
      this.imssService.searchImss(this.formSearch.value).subscribe((res: any) => {

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

  downloadFiles(imss, infonavit, impuesto, pagoImss, pagoImpuesto){
    const modalRef = this.modalService.open(ModalDownloadFilesComponent, {size: 'xl', scrollable: true});
    modalRef.componentInstance.imss = imss;
    modalRef.componentInstance.infonavit = infonavit;
    modalRef.componentInstance.impuesto = impuesto;
    modalRef.componentInstance.pagoImss = pagoImss;
    modalRef.componentInstance.pagoImpuesto = pagoImpuesto;


  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.formData = this.imss
    modalRef.result.then(result => result ? this.get() : false)
  }//open()

  edit(i) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' })
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
