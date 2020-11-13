import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRespaldosSuaComponent } from '../modal-respaldos-sua/modal-respaldos-sua.component';
import { BackupSUAModel } from '../../models/BackupSUAModel';
import { BackupSuaService } from '../../services/backup-sua.service';
import { SharedServices } from '../../../../services/shared-services/shared-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-respaldos-sua',
  templateUrl: './lista-respaldos-sua.component.html',
  styleUrls: ['./lista-respaldos-sua.component.css']
})
export class ListaRespaldosSuaComponent implements OnInit {
  loader: boolean = false;
  suaList: BackupSUAModel[] = [];
  constructor(
    private modalService: NgbModal,
    private suaService: BackupSuaService,
    private sharedServices: SharedServices
  ) { }

  ngOnInit() {
    this.get();

  }

  get() {
    this.loader = true;
    this.suaService.getSUA().subscribe((res: any) => {
      console.log(res);
      this.loader = false;
      if (res.data.length > 0) {
        this.suaList = res.data;
      } else {
        this.suaList = [];
        Swal.fire('Atención', res.message, 'info');

      }
    }, error => {
      this.loader = false;
      Swal.fire('Error', error.error.message, 'error');
    })
  }

  openModal() {
    console.log('click')
    let modalRef = this.modalService.open(ModalRespaldosSuaComponent);
    modalRef.result.then(res => { res && this.get() });
  }

  editSUA(sua: BackupSUAModel) {
    let modalRef = this.modalService.open(ModalRespaldosSuaComponent);
    modalRef.componentInstance.suaInput = sua;
    modalRef.result.then(res => { res && this.get() });

  }

  deleteSUA(index: number, id: number) {
    this.sharedServices.showMessageDelete('¿Esta seguro que quiere eliminar este respaldo SUA?').then(res => {
      if (res.value) {
        this.sharedServices.loadingSwal();
        this.suaList.splice(index, 1);
        this.suaService.deleteSUA(id).subscribe((res: any) => {
          this.get();
          Swal.fire('Éxito', res.message, 'success')
        }, error => {
          Swal.fire('Error', error.error.message, 'error')
        })
      } else {
        Swal.fire('Atención', 'Respaldo SUA no eliminado.', 'info')
      }
    })

  }

}
