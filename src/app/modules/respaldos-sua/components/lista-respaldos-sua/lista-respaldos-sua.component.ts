import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRespaldosSuaComponent } from '../modal-respaldos-sua/modal-respaldos-sua.component';
import { BackupSUAModel } from '../../models/BackupSUAModel';
import { BackupSuaService } from '../../services/backup-sua.service';
import { SharedServices } from '../../../../services/shared-services/shared-services.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDownloadFilesComponent } from 'src/app/modules/shared/components/modal-download-files/modal-download-files.component';

@Component({
  selector: 'app-lista-respaldos-sua',
  templateUrl: './lista-respaldos-sua.component.html',
  styleUrls: ['./lista-respaldos-sua.component.css']
})
export class ListaRespaldosSuaComponent implements OnInit {
  loader: boolean = false;
  suaList: BackupSUAModel[] = [];
  isCollapsed: boolean = true;
  form: FormGroup;


  constructor(
    private modalService: NgbModal,
    private suaService: BackupSuaService,
    private sharedServices: SharedServices,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createFormSearch();
    this.get();

  }

  createFormSearch() {
    this.form = this.fb.group({
      date: [null],
      period: [null],
      obra: [null]

    })
  }

  get() {
    this.loader = true;
    // this.suaList = [];
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

  search() {

    let period = this.form.get('period').value;
    let date = this.form.get('date').value;
    let obra = this.form.get('obra').value;

    if (period != null || date != null || obra != null) {
      this.suaList = [];
      this.loader = true;
      console.log('servicio buscar');
      this.suaService.searchSua(this.form.value).subscribe((res: any) => {

        if (res.data.length > 0) {
          this.suaList = res.data;
        } else {
          this.suaList = [];
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

  downloadFiles(sua: BackupSUAModel){
    let arrBackup = [];
    let arrAmount = [];
    let arrMonthly = [];

    if (sua.file_backup != null) {
      const objTemp = {
        name: sua.file_backup,
        file_url: sua.file_backup_route
      }
      arrBackup.push(objTemp);
    }
    if (sua.file_amount != null) {
      const objTemp = {
        name: sua.file_amount,
        file_url: sua.file_amount_route
      }
      arrAmount.push(objTemp);
    }

    if (sua.monthly_files_current.length > 0) {
      sua.monthly_files_current.forEach(element => {
        const objTemp = {
          name: element.file_name,
          file_url: element.file_route
        }

        arrMonthly.push(objTemp);
      });
    }

    const modalRef = this.modalService.open(ModalDownloadFilesComponent, {size: 'xl', scrollable: true});
    modalRef.componentInstance.arrBackup = arrBackup;
    modalRef.componentInstance.arrAmount = arrAmount;
    modalRef.componentInstance.arrMonthly = arrMonthly;

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
