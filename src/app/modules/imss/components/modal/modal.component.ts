import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImssService } from 'src/app/services/imss-services/imss.service';
import { NgbActiveModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData

  button_label = 'Crear Emision'

  form: FormGroup
  submitted: Boolean = false
  loader: Boolean = false

  formUpload = new FormData();

  imss_edit = []
  infonavit_edit = []
  impuesto_edit = []
  pago_imss_edit = []
  pago_impuesto_edit = []

  imss_files = []
  infonavit_files = []
  impuesto_files = []
  pago_imss_files = []
  pago_impuesto_files = []

  constructor(
    private calendar: NgbCalendar,
    private imssService: ImssService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.formBuilder.group({
      id: [],
      date: ['', [Validators.required]],
      period: ['', [Validators.required]],
      imss: [],
      infonavit: [],
      impuesto: [],
      pago_imss: [],
      pago_impuesto: [],
      loader: [],
      created_at: [],
      updated_at: [],
      deleted_at: []
    })
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.formData.id != null) {
        this.imss_edit = this.formData.imss
        this.infonavit_edit = this.formData.infonavit
        this.impuesto_edit = this.formData.impuesto
        this.pago_imss_edit = this.formData.pago_imss
        this.pago_impuesto_edit = this.formData.pago_impuesto

        this.form.setValue(this.formData)
      } else {
        let today_date = this.calendar.getToday()
        this.form.patchValue({ date: today_date.day + '-' + today_date.month + '-' + today_date.year })
      }

    })

  }//

  get c() { return this.form.controls }

  onFileSelectImss(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.imss_files.push(file)
    }
  }//
  deleteFileImss = ind => this.imss_files.splice(ind, 1)
  deleteFileImssLoaded = i => this.imss_edit[i].deleted = true

  onFileSelectInfonavit(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.infonavit_files.push(file)
    }
  }//
  deleteFileInfonavit = ind => this.infonavit_files.splice(ind, 1)
  deleteFileInfonavitLoaded = i => this.infonavit_edit[i].deleted = true

  onFileSelectImpuesto(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.impuesto_files.push(file)
    }
  }//
  deleteFileImpuesto = ind => this.impuesto_files.splice(ind, 1)
  deleteFileImpuestoLoaded = i => this.impuesto_edit[i].deleted = true

  onFileSelectPagoImss(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.pago_imss_files.push(file)
    }
  }//
  deleteFilePagoImss = ind => this.pago_imss_files.splice(ind, 1)
  deleteFilePagoImssLoaded = i => this.pago_imss_edit[i].deleted = true

  onFileSelectPagoImpuesto(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.pago_impuesto_files.push(file)
    }
  }//
  deleteFilePagoImpuesto = ind => this.pago_impuesto_files.splice(ind, 1)
  deleteFilePagoImpuestoLoaded = i => this.pago_impuesto_edit[i].deleted = true

  onSubmit() {
    let check_repeatedIm = this.formUpload.getAll('imss_files[]')
    if (this.imss_files.length > 0) {
      for (let d in this.imss_files) {
        let repeatedIm = false
        for (let cr in check_repeatedIm) {
          if (check_repeatedIm[cr]['name'] == this.imss_files[d]['name']) repeatedIm = true
        }
        if (repeatedIm == false) {
          this.formUpload.append('imss_files[]', this.imss_files[d])
        }
      }
    }

    let check_repeatedIn = this.formUpload.getAll('infonavit_files[]')
    if (this.infonavit_files.length > 0) {
      for (let d in this.infonavit_files) {
        let repeatedIn = false
        for (let cr in check_repeatedIn) {
          if (check_repeatedIn[cr]['name'] == this.infonavit_files[d]['name']) repeatedIn = true
        }
        if (repeatedIn == false) {
          this.formUpload.append('infonavit_files[]', this.infonavit_files[d])
        }
      }
    }

    let check_repeatedImp = this.formUpload.getAll('impuesto_files[]')
    if (this.impuesto_files.length > 0) {
      for (let d in this.impuesto_files) {
        let repeatedImp = false
        for (let cr in check_repeatedImp) {
          if (check_repeatedImp[cr]['name'] == this.impuesto_files[d]['name']) repeatedImp = true
        }
        if (repeatedImp == false) {
          this.formUpload.append('impuesto_files[]', this.impuesto_files[d])
        }
      }
    }

    let check_repeatedIms = this.formUpload.getAll('pago_imss_files[]')
    if (this.pago_imss_files.length > 0) {
      for (let d in this.pago_imss_files) {
        let repeatedIms = false
        for (let cr in check_repeatedIms) {
          if (check_repeatedIms[cr]['name'] == this.pago_imss_files[d]['name']) repeatedIms = true
        }
        if (repeatedIms == false) {
          this.formUpload.append('pago_imss_files[]', this.pago_imss_files[d])
        }
      }
    }

    let check_repeatedPI = this.formUpload.getAll('pago_impuesto_files[]')
    if (this.pago_impuesto_files.length > 0) {
      for (let d in this.pago_impuesto_files) {
        let repeatedPM = false
        for (let cr in check_repeatedPI) {
          if (check_repeatedPI[cr]['name'] == this.pago_impuesto_files[d]['name']) repeatedPM = true
        }
        if (repeatedPM == false) {
          this.formUpload.append('pago_impuesto_files[]', this.pago_impuesto_files[d])
        }
      }
    }

    this.formUpload.append('id', this.form.value.id)
    this.formUpload.append('date', this.form.value.date)
    this.formUpload.append('period', this.form.value.period)

    console.log(this.formUpload.get('id'))
    this.submitted = true
    if (this.form.invalid) {
      return;
    } else {
      this.loader = true
      if (this.form.value.id === null) {

        if (this.imss_files.length == 0 && this.infonavit_files.length == 0 && this.impuesto_files.length == 0 && this.pago_imss_files.length == 0 && this.pago_impuesto_files.length == 0) {
          Swal.fire('¡Atención!', 'Debe agregar por lo menos un archivo por cada sección', 'warning')
          this.loader = false
        } else {
          this.imssService
            .store(this.formUpload)
            .subscribe(
              (res) => {
                console.log(res)
                this.loader = false
                Swal.fire('¡Éxito!', res.message, 'success')
                this.activeModal.close(true)
              },
              error => {
                this.loader = false
                Swal.fire('¡Error!', error.error.message, 'error')
              })
        }
      } else {

        let is_validate_imss = false
        if (this.imss_edit.length > 0) {
          for (let i in this.imss_edit) {
            if (this.imss_edit[i].deleted == false) is_validate_imss = true
          }
          if (this.imss_files.length > 0) is_validate_imss = true
        } else {
          if (this.imss_files.length > 0) is_validate_imss = true
        }

        let is_validate_infonavit = false
        if (this.infonavit_edit.length > 0) {
          for (let i in this.infonavit_edit) {
            if (this.infonavit_edit[i].deleted == false) is_validate_infonavit = true
          }
          if (this.infonavit_files.length > 0) is_validate_infonavit = true
        } else {
          if (this.infonavit_files.length > 0) is_validate_infonavit = true
        }

        let is_validate_impuesto = false
        if (this.impuesto_edit.length > 0) {
          for (let i in this.impuesto_edit) {
            if (this.impuesto_edit[i].deleted == false) is_validate_impuesto = true
          }
          if (this.impuesto_files.length > 0) is_validate_impuesto = true
        } else {
          if (this.impuesto_files.length > 0) is_validate_impuesto = true
        }

        let is_validate_pago_imss = false
        if (this.pago_imss_edit.length > 0) {
          for (let i in this.pago_imss_edit) {
            if (this.pago_imss_edit[i].deleted == false) is_validate_pago_imss = true
          }
          if (this.pago_imss_files.length > 0) is_validate_pago_imss = true
        } else {
          if (this.pago_imss_files.length > 0) is_validate_pago_imss = true
        }


        let is_validate_pago_impuesto = false
        if (this.pago_impuesto_edit.length > 0) {
          for (let i in this.pago_impuesto_edit) {
            if (this.pago_impuesto_edit[i].deleted == false) is_validate_pago_impuesto = true
          }
          if (this.pago_impuesto_files.length > 0) is_validate_pago_impuesto = true
        } else {
          if (this.pago_impuesto_files.length > 0) is_validate_pago_impuesto = true
        }

        if (is_validate_imss == true && is_validate_infonavit == true && is_validate_impuesto == true && is_validate_pago_imss == true && is_validate_pago_impuesto == true) {

          if (this.imss_edit.length > 0) {
            for (let i in this.imss_edit) this.formUpload.append('imss_edit[' + i + '][id]', this.imss_edit[i].id)
            for (let i in this.imss_edit) this.formUpload.append('imss_edit[' + i + '][deleted]', this.imss_edit[i].deleted)
          }
          if (this.infonavit_edit.length > 0) {
            for (let i in this.infonavit_edit) this.formUpload.append('infonavit_edit[' + i + '][id]', this.infonavit_edit[i].id)
            for (let i in this.infonavit_edit) this.formUpload.append('infonavit_edit[' + i + '][deleted]', this.infonavit_edit[i].deleted)
          }
          if (this.impuesto_edit.length > 0) {
            for (let i in this.impuesto_edit) this.formUpload.append('impuesto_edit[' + i + '][id]', this.impuesto_edit[i].id)
            for (let i in this.impuesto_edit) this.formUpload.append('impuesto_edit[' + i + '][deleted]', this.impuesto_edit[i].deleted)
          }
          if (this.pago_imss_edit.length > 0) {
            for (let i in this.pago_imss_edit) this.formUpload.append('pago_imss_edit[' + i + '][id]', this.pago_imss_edit[i].id)
            for (let i in this.pago_imss_edit) this.formUpload.append('pago_imss_edit[' + i + '][deleted]', this.pago_imss_edit[i].deleted)
          }
          if (this.pago_impuesto_edit.length > 0) {
            for (let i in this.pago_impuesto_edit) this.formUpload.append('pago_impuesto_edit[' + i + '][id]', this.pago_impuesto_edit[i].id)
            for (let i in this.pago_impuesto_edit) this.formUpload.append('pago_impuesto_edit[' + i + '][deleted]', this.pago_impuesto_edit[i].deleted)
          }

          this.imssService
            .store(this.formUpload)
            .subscribe(
              (res) => {
                console.log(res)
                this.loader = false
                Swal.fire('¡Éxito!', res.message, 'success')
                this.activeModal.close(true)
              },
              error => {
                this.loader = false
                Swal.fire('¡Error!', error.error.message, 'error')
              })
        } else {
          this.loader = false
          Swal.fire('¡Atención!', 'Debe agregar un archivo por cada modalidad.', 'warning')
        }
      }
    }
  }//CreateCampus()

  Close() {
    this.activeModal.close(false)
  }

}////
