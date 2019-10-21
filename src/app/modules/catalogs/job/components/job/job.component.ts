import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { JobServices } from 'src/app/services/job-services/job-services.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  list: Job[] = []
  list_loader:Boolean = false

  job:Job = {
    id: null,
    name: '',
    company_id: null,
    company: null,
    department: null,
    department_id: null,
    loader: false,
    created_at: '',
    updated_at: '',
    deleted_at: ''
  }

  create_loader:Boolean = false

  constructor(
    private jobService: JobServices,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig
  ) {
    modalConfig.backdrop = 'static'
    modalConfig.keyboard = false
  }

  ngOnInit() {
    this.getList()
  }

  getList()
  {
    this.list = []
    this.list_loader = true
    this.jobService.get()
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

  open(){
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.job
    modalRef.result.then(result => result ? this.getList() : false)
  }

  edit(i){
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.formData = this.list[i]
    modalRef.result.then(result => result ? this.getList() : false)
  }

  delete(i)
  {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este Puesto?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.list[i].loader = true
        this.jobService.delete(this.list[i].id)
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
        Swal.fire('', 'Puesto no eliminado', 'warning')
      }
    })
  }//delete()

}
