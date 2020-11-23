import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NominaService } from 'src/app/services/nomina-services/nomina.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  loader: boolean = false
  list = []

  nomina = {
    id: null,
    date: '',
    period: '',
    obra: '',
    nomina_excel: null,
    nomina_dispersion: null,
    created_at: null,
    updated_at: null,
    deleted_at: null
  }

  isCollapsed: boolean = true;
  formSearch: FormGroup;

  constructor(
    private nominaService: NominaService,
    private modalService: NgbModal,
    modal_config: NgbModalConfig,
    private fb: FormBuilder
  ) {
    modal_config.backdrop = 'static'
    modal_config.keyboard = false
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
    this.loader = true
    this.list = []
    this.nominaService.get()
      .subscribe(
        res => {
          console.log(res)
          this.loader = false
          this.list = res.data
          if (res.data.length == 0) {
            Swal.fire('¡Atención!', res.message, 'warning')
          }
        },
        error => {
          console.log(error.error.message)
          this.loader = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }//ChangeDepartment()

  search() {

    let period = this.formSearch.get('period').value;
    let date = this.formSearch.get('date').value;
    let obra = this.formSearch.get('obra').value;

    if (period != null || date != null || obra != null) {
      this.list = [];
      this.loader = true;
      console.log('servicio buscar');
      this.nominaService.searchNomina(this.formSearch.value).subscribe((res: any) => {

        if (res.data.length > 0) {
          this.list = res.data;
        } else {
          this.list = [];
          Swal.fire('Atención', res.message, 'info');
        }
        this.loader = false;
      }, error => {
        this.loader = false;
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
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });

    modalRef.componentInstance.formDataEdit = this.nomina
    modalRef.result.then(result => result ? this.get() : false)
  }

  edit(i) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' })
    modalRef.componentInstance.formDataEdit = this.list[i]
    modalRef.result.then(result => result ? this.get() : false)
  }//edit()

  delete(i) {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar esta Nomina?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.list[i].loader = true
        this.nominaService.delete(this.list[i].id)
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
        Swal.fire('', 'País no eliminado', 'warning')
      }
    })
  }
}////
