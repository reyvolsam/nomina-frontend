import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCfdiComponent } from '../modal-cfdi/modal-cfdi.component';
import { CfdiNominaService } from '../../services/cfdi-nomina.service';
import Swal from 'sweetalert2';
import { CFDIModel } from '../../models/CFDIModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedServices } from '../../../../services/shared-services/shared-services.service';

@Component({
  selector: 'app-list-cfdi',
  templateUrl: './list-cfdi.component.html',
  styleUrls: ['./list-cfdi.component.css']
})
export class ListCfdiComponent implements OnInit {

  loader: boolean = false;
  cfdiList: CFDIModel[] = [];


  constructor(
    private serviceModal: NgbModal,
    private cfdiService: CfdiNominaService,
    private sharedServices: SharedServices

  ) { }

  ngOnInit() {
    this.get();

  }

  get() {
    this.loader = true;
    this.cfdiService.getCFDI().subscribe((res: any) => {
      console.log(res);
      this.loader = false;
      if (res.data.length > 0) {
        this.cfdiList = res.data;
      } else {
        this.cfdiList = [];
        Swal.fire('Atención', res.message, 'info');

      }
    }, error => {
      this.loader = false;
      Swal.fire('Error', error.error.message, 'error');
    })
  }

  openModal() {
    console.log('click')
    let modalRef = this.serviceModal.open(ModalCfdiComponent);
    modalRef.result.then(res => { res && this.get() });
  }

  editCfdi(cfdi: CFDIModel) {
    let modalRef = this.serviceModal.open(ModalCfdiComponent);
    modalRef.componentInstance.cfdiInput = cfdi;
    modalRef.result.then(res => { res && this.get() });

  }

  deleteCfdi(index: number, id: number) {
    this.sharedServices.showMessageDelete('¿Esta seguro que quiere eliminar este CFDI de nomina?').then(res => {
      if (res.value) {
        this.sharedServices.loadingSwal();
        this.cfdiList.splice(index, 1);
        this.cfdiService.deleteCFDI(id).subscribe((res: any) => {
          this.get();
          Swal.fire('Éxito', res.message, 'success')
        }, error => {
          Swal.fire('Error', error.error.message, 'error')
        })
      } else {
        Swal.fire('Atención', 'CFDI no eliminado.', 'info')
      }
    })

  }



}
