import { Component, OnInit } from '@angular/core';
import { ContractTypes } from 'src/app/models/ContractTypes';
import { ContractTypesService } from 'src/app/services/contractTypes/contractTypes.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { Company } from 'src/app/models/Company';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contract-types',
  templateUrl: './contractTypes.component.html',
  styleUrls: ['./contractTypes.component.css']
})
export class ContractTypesComponent implements OnInit {

  currentUser: User

  list: ContractTypes[] = []
  list_loader:Boolean = false

  contractTypes:ContractTypes = {
    id:null,
    name: '',
    loader: false,
    company_id: null,
    company: null,
    created_at: '',
    updated_at: '',
    deleted_at: ''
  }
  create_loader:Boolean = false

  constructor(
    private authService: AuthService,
    private contractTypesService:ContractTypesService,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig
    ){
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
    this.contractTypesService.get()
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
    modalRef.componentInstance.formData = this.contractTypes
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
      title: '¿Estas seguro de querer eliminar este Tipo de Contrato?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.contractTypesService.delete(this.list[i].id)
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
        Swal.fire('', 'Tipo de Contrato no eliminado', 'warning')
      }
    })
  }//delete()

}
