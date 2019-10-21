import { Component, OnInit } from '@angular/core';
import { EmployeeTypesService } from 'src/app/services/employeeTypes/employee-types.service';
import { EmployeeTypes } from 'src/app/models/EmployeeTypes';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from 'src/app/modules/catalogs/employee-types/components/modal/modal.component';

@Component({
  selector: 'app-employee-types',
  templateUrl: './employee-types.component.html',
  styleUrls: ['./employee-types.component.css']
})
export class EmployeeTypesComponent implements OnInit {

  list: EmployeeTypes[] = []
  list_loader: Boolean = false

  employeeTypes:EmployeeTypes = {
    id:null,
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
    private employeeTypesService: EmployeeTypesService,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig
  ) {
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
    this.employeeTypesService.get()
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
    modalRef.componentInstance.formData = this.employeeTypes
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
      title: '¿Estas seguro de querer eliminar este Tipo de Empleado?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.employeeTypesService.delete(this.list[i].id)
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
        Swal.fire('', 'Tipo de Empleado no eliminado', 'warning')
      }
    })
  }//delete()

}
