
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CFDIModel } from '../../models/CFDIModel';
import { SharedServices } from '../../../../services/shared-services/shared-services.service';
import Swal from 'sweetalert2';
import { CfdiNominaService } from '../../services/cfdi-nomina.service';

@Component({
  selector: 'app-modal-cfdi',
  templateUrl: './modal-cfdi.component.html',
  styleUrls: ['./modal-cfdi.component.css']
})
export class ModalCfdiComponent implements OnInit {

  loader: boolean = false;
  btnText: string = 'Guardar';
  cfdiList = [];
  cfdiListEdit = [];
  submit: boolean = false;
  cfdi: CFDIModel;

  @Input() cfdiInput: CFDIModel = null;
  form: FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    private config: NgbModalConfig,
    private fb: FormBuilder,
    private sharedServices: SharedServices,
    private cfdiService: CfdiNominaService
  ) {

    this.config.backdrop = 'static';
    this.config.keyboard = false;
  }

  ngOnInit() {
    console.log(this.cfdiInput);
    this.createForm();
    this.cfdiInput != null && this.setFormValues();
  }

  createForm() {
    this.form = this.fb.group({
      id: [null],
      date: [null, Validators.required],
      period: [null, Validators.required],
      file_pdf: [null],
      file_xml: [null],
      // file_name_pdf: [null],
      // file_name_xml: [null],
      created_at: [null],
      updated_at: [null],
      deleted_at: [null],
      file_pdf_route: [null],
      file_xml_route: [null],
    })
  }

  get dateRequired() { return this.form.get('date').invalid }
  get periodRequired() { return this.form.get('period').invalid }

  setFormValues() {

    this.btnText = 'Actualizar';

    if (this.cfdiInput.file_pdf != null) {
      let objFile = {
        fileName: null,
        fileRoute: null,
      }
      objFile.fileName = this.cfdiInput.file_pdf;
      objFile.fileRoute = this.cfdiInput.file_pdf_route;

      this.cfdiListEdit.push(objFile);
    }

    if (this.cfdiInput.file_xml != null) {
      let objFile = {
        fileName: null,
        fileRoute: null,
      }
      objFile.fileName = this.cfdiInput.file_xml;
      objFile.fileRoute = this.cfdiInput.file_xml_route;

      this.cfdiListEdit.push(objFile);
    }

    let data = {
      ...this.cfdiInput
    }

    this.form.setValue(this.cfdiInput)

  }

  deleteCFDIEdit(fileName: String, index: number) {
    var extencion = fileName.split('.');
    console.log(extencion[1])
    if (extencion[1] == 'pdf') {
      this.form.get('file_pdf').setValue(null);
    } else {
      this.form.get('file_xml').setValue(null);
    }
    this.cfdiListEdit.splice(index, 1);
    console.log(fileName, '  form', this.form.value);

  }

  onFileSelectCFDI(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      if (this.cfdiList.length < 2) {
        this.cfdiList.push(file)
      }
    }
  }//

  deleteFile(i: number) {
    this.cfdiList.splice(i, 1);
  }

  async saveOrUpdate() {
    this.submit = true;
    if (this.form.valid) {
      this.sharedServices.loadingSwal();
      let data = await this.formatObj();
      this.cfdi = data;
      console.log('data para servicio', data);
      if (data.id == null) {
        this.cfdiService.postCFDI(this.cfdi).subscribe((res: any) => {
          this.close(true);
          Swal.fire('Éxito', res.message, 'success');
        }, error => {
          Swal.fire('Error', error.error.message, 'error');
        })

      } else {
        // servicio para update
        console.log('update');
        this.cfdiService.putCFDI(this.cfdi).subscribe((res: any) => {
          this.close(true);
          Swal.fire('Éxito', res.message, 'success');
        }, error => {
          Swal.fire('Error', error.error.message, 'error');
        })
      }

    } else {
      Swal.fire('Error', 'Debe completar los campos requeridos.', 'error')

    }


  }

  async formatObj() {
    let objTemp = {
      ...this.form.value
    }

    objTemp.file_name_pdf = null;
    objTemp.file_name_xml = null;


    console.log(this.form.value);
    if (this.cfdiList.length > 0) {
      console.log(this.cfdiList);
      for (const val of this.cfdiList) {
        console.log(val)
        let fileName = val.name;
        let name = val.name.split('.');
        console.log(name[1]);
        if (name[1] == 'pdf') {
          console.log('es pdf');
          await this.sharedServices.toBase64(val).then((res: any) => {
            if (res) {
              // console.log(res)
              let base = res.split(',');
              // this.basePdf = base[1]
              // console.log(base[1]);
              objTemp.file_pdf = base[1];
              objTemp.file_name_pdf = fileName;
            }
          });
        } else {
          console.log('es xml');
          await this.sharedServices.toBase64(val).then((res: any) => {
            if (res) {
              // console.log(res)
              let base = res.split(',');
              // console.log(base[1]);
              objTemp.file_xml = base[1];
              objTemp.file_name_xml = fileName;
            }
          });
        }

      }

    }

    return objTemp;
  }

  close(value = false) {
    this.activeModal.close(value);
  }

}
