import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackupSUAModel, MonthlyFilesCurrent, MonthlyFilesNew } from '../../models/BackupSUAModel';
import Swal from 'sweetalert2';
import { SharedServices } from '../../../../services/shared-services/shared-services.service';
import { BackupSuaService } from '../../services/backup-sua.service';

@Component({
  selector: 'app-modal-respaldos-sua',
  templateUrl: './modal-respaldos-sua.component.html',
  styleUrls: ['./modal-respaldos-sua.component.css']
})
export class ModalRespaldosSuaComponent implements OnInit {

  loader: boolean = false;
  btnText: string = 'Guardar';
  submited: boolean = false;
  respaldosList = [];
  emisionList: MonthlyFilesNew[] = [];
  importeList = [];
  form: FormGroup
  @Input() suaInput: BackupSUAModel = null;

  sua: BackupSUAModel = null;
  suaEdit: BackupSUAModel = null;

  fileBackup: File = null;
  fileAmount: File = null;
  hasCurrentFiles: MonthlyFilesCurrent[] = [];
  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private sharedServices: SharedServices,
    private suaService: BackupSuaService
  ) { }

  ngOnInit() {
    this.createForm();
    this.suaInput != null ? this.setFormValues() : this.suaEdit = { ...this.form.value };
  }

  createForm() {
    this.form = this.fb.group({
      id: [null],
      date: [null, Validators.required],
      period: [null, Validators.required],
      file_backup: [null],
      file_amount: [null],
      file_name_backup: [null],
      file_name_amount: [null],
      file_backup_route: [null],
      file_amount_route: [null],
      monthly_files_new: [null],
      monthly_files_current: [null],
      created_at: [null],
      updated_at: [null],
      deleted_at: [null],
    })

  }

  get dateRequired() { return this.form.get('date').invalid }
  get periodRequired() { return this.form.get('period').invalid }

  onFileSelect(event, opt: string) {
    let file = null;
    console.log('select')
    switch (opt) {
      case 'backup':
        file = event.target.files[0]
        this.fileBackup = file;
        this.suaEdit.file_backup = file.name;
        break;
      case 'amount':
        file = event.target.files[0]
        this.fileAmount = file;
        this.suaEdit.file_amount = file.name;
        break;
      default:
        break;
    }

  }//

  deleteFileEdit(val) {
    switch (val) {
      case 'backup':
        console.log('del file backup')
        this.suaEdit.file_backup = null;
        this.suaEdit.file_backup_route = null;
        break;
      case 'amount':
        console.log('del file amount')
        this.suaEdit.file_amount = null;
        this.suaEdit.file_amount_route = null;
        break;
      default:
        break;
    }

  }

  onFileSelectEmision(event) {
    let emision = {
      file_base: null,
      file_name: null
    };
    emision.file_base = null;
    emision.file_name = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      emision.file_name = file.name;
      emision.file_base = file;

      this.emisionList.push(emision)
    }
  }//

  deleteFileEmision = i => this.emisionList.splice(i, 1)


  setFormValues() {
    this.btnText = 'Actualizar';
    console.log('inicio model editar', this.suaInput)
    this.suaEdit = { ...this.suaInput };
    this.form.setValue(this.suaInput);
    this.hasCurrentFiles = [...this.suaInput.monthly_files_current]

    console.log(this.hasCurrentFiles)
  }

  deleteFileCurrents(index: number) {
    this.suaEdit.monthly_files_current[index].delete_file = true;
    this.hasCurrentFiles.splice(index, 1);

  }
  async submit() {
    this.submited = true;
    if (this.form.valid) {
      this.sharedServices.loadingSwal();
      this.sua = await this.formatObj();
      if (this.sua.id == null) {
        console.log('post', this.sua);
        this.suaService.postSUA(this.sua).subscribe((res: any) => {
          this.close(true);
          Swal.fire('Éxito', res.message, 'success');
        }, error => {
          Swal.fire('Error', error.error.message, 'error');
        })
      } else {
        console.log('put', this.sua);
        this.suaService.putSUA(this.sua).subscribe((res: any) => {
          this.close(true);
          Swal.fire('Éxito', res.message, 'success');
        }, error => {
          Swal.fire('Error', error.error.message, 'error');
        })
      }

    } else {
      Swal.fire('Error', 'Debe completar los campos requeridos', 'error')
    }

  }

  async formatObj() {
    let obj: BackupSUAModel = {
      ...this.form.value
    }

    obj.file_backup = this.suaEdit.file_backup;
    obj.file_amount = this.suaEdit.file_amount;
    obj.file_name_backup = null;
    obj.file_name_amount = null;

    if (this.fileBackup != null) {
      obj.file_name_backup = this.fileBackup.name;
      await this.sharedServices.toBase64(this.fileBackup).then((res: any) => {
        if (res) {
          let base = res.split(',')
          obj.file_backup = base[1];
        }
      })
    }

    if (this.fileAmount != null) {
      obj.file_name_amount = this.fileAmount.name;
      await this.sharedServices.toBase64(this.fileAmount).then((res: any) => {
        if (res) {
          let base = res.split(',')
          obj.file_amount = base[1];
        }
      })
    }


    if (this.emisionList.length > 0) {
      for (const e of this.emisionList) {
        let data: any = await this.sharedServices.toBase64(e.file_base);
        // console.log(data)
        let base = data.split(',');
        e.file_base = base[1];

      }
    }

    // console.log(this.emisionList)
    obj.monthly_files_current = this.suaEdit.monthly_files_current;
    obj.monthly_files_new = this.emisionList;

    return obj;
  }


  close(value = false) {
    this.activeModal.close(value);
  }

}
