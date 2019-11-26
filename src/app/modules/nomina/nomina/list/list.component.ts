import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NominaService } from 'src/app/services/nomina-services/nomina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  loader:Boolean = false
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
  constructor(
    private nominaService: NominaService,
    private modalService: NgbModal,
    modal_config: NgbModalConfig
  ) {
    modal_config.backdrop = 'static'
    modal_config.keyboard = false
  }

  ngOnInit() {
    this.get()
  }

  get()
  {
    this.loader = true
    this.nominaService.get()
    .subscribe(
    res => {
      console.log(res)
      this.loader = false
      this.list = res.data
      if(res.data.length == 0){
        Swal.fire('¡Atención!', res.message, 'warning')
      }
    },
    error => {
      console.log(error.error.message)
      this.loader = false
      Swal.fire('¡Error!', error.error.message, 'warning')
    })
  }//ChangeDepartment()

  open()
  {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });

    modalRef.componentInstance.formDataEdit = this.nomina
    modalRef.result.then(result => result ? this.get() : false)
  }

  edit(i)
  {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' })
    modalRef.componentInstance.formDataEdit = this.list[i]
    modalRef.result.then(result => result ? this.get() : false)
  }//edit()

}////
