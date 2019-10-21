import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company/company.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  list: Company[] = []
  list_loader:Boolean = false

  company:Company = {
    id: null,
    name: '',
    contact: '',
    rfc: '',
    telephone: '',
    loader: false,
    created_at: '',
    updated_at: '',
    deleted_at: ''
  }
  create_loader:Boolean = false

  constructor(
    private companyService:CompanyService,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig
    ){
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
    this.companyService.get()
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
  }//getCampusList()

  open()
  {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.company
    modalRef.result.then(result => result ? this.getList() : false)
  }//open()

  edit(i)
  {
    console.log(this.list[i].contact)
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.formData = this.list[i]
    modalRef.result.then(result => result ? this.getList() : false)
  }//edit()

  delete(i)
  {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar esta Empresa?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.companyService.delete(this.list[i].id)
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
        Swal.fire('', 'Empresa no eliminada', 'warning')
      }
    })
  }//delete()

}
