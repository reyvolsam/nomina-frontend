import { Component, OnInit } from '@angular/core';
import { ContributionBases } from 'src/app/models/ContributionBases';
import { ContributionBasesService } from 'src/app/services/contributionBases/contributionBases.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-contibution-app',
  templateUrl: './contributionBases.component.html',
  styleUrls:['./contributionBases.component.css']
})
export class ContributionBasesComponent implements OnInit {

  list: ContributionBases[] = []
  list_loader:Boolean = false

  contributionBases:ContributionBases = {
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
    private contributionBasesService:ContributionBasesService,
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
    this.contributionBasesService.get()
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
    modalRef.componentInstance.formData = this.contributionBases
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
      title: '¿Estas seguro de querer eliminar esta Base de Cotización?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.contributionBasesService.delete(this.list[i].id)
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
        Swal.fire('', 'Base de Cotización no eliminada', 'warning')
      }
    })
  }//delete()

}
