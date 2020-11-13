import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NominaService } from 'src/app/services/nomina-services/nomina.service';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formDataEdit;

  nominaForm: FormGroup
  submitted: Boolean = false
  loader: Boolean = false
  dispersion_files = []

  dispersion_edit = []

  formData = new FormData();

  button_label = 'Crear lista de pago'

  constructor(
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private nominaService: NominaService,
    public activeModal: NgbActiveModal
  ) {
    this.nominaForm = this.formBuilder.group({
      id: [],
      date: ['', [Validators.required]],
      period: ['', [Validators.required]],
      obra: ['', [Validators.required]],
      nomina_dispersion: [],
      created_at: [],
      updated_at: [],
      deleted_at: []
    })
  }

  ngOnInit() {
    let d = new Date();
    console.log(d.toLocaleDateString(), d.toLocaleString(), d.toLocaleTimeString())
    setTimeout(() => {
      if (this.formDataEdit.id != null) {
        this.button_label = 'Editar Nomina';

        this.dispersion_edit = this.formDataEdit.nomina_dispersion
        console.log(this.dispersion_edit);

        this.nominaForm.setValue(this.formDataEdit)
      } else {
        let today_date = this.calendar.getToday()
        // today_date
        // this.nominaForm.patchValue({ date: today_date.day + '-' + today_date.month + '-' + today_date.year })
        this.nominaForm.patchValue({ date: d.toLocaleString() })
      }
    })
  }

  get c() { return this.nominaForm.controls }

  onFileSelectDispersion(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]

      console.log(file)

      this.dispersion_files.push(file)
      console.log('select file', this.dispersion_files)
    }
  }//

  deleteFileDispersion = ind => this.dispersion_files.splice(ind, 1)

  deleteFileDispersionLoaded = i => this.dispersion_edit[i].deleted = true

  onSubmit() {

    this.submitted = true

    let check_repeatedD = this.formData.getAll('dispersion_files[]')
    if (this.dispersion_files.length > 0) {
      for (let d in this.dispersion_files) {
        // console.log(this.dispersion_files)
        let repeatedD = false
        for (let cr in check_repeatedD) {
          if (check_repeatedD[cr]['name'] == this.dispersion_files[d]['name']) repeatedD = true
        }
        if (repeatedD == false) {
          this.formData.append('dispersion_files[]', this.dispersion_files[d])
        }
      }
    }

    this.formData.append('id', this.nominaForm.value.id)
    this.formData.append('date', this.nominaForm.value.date)
    this.formData.append('period', this.nominaForm.value.period)
    this.formData.append('obra', this.nominaForm.value.obra)

    if (this.nominaForm.invalid) {
      return;
    } else {
      if (this.nominaForm.value.id == null) {

        if (this.dispersion_files.length == 0) {
          Swal.fire('¡Atención!', 'Debe agregar por lo menos un archivo por cada sección', 'warning')
        } else {
          this.loader = true
          this.nominaService.store(this.formData)
            .subscribe(
              res => {
                console.log(res)
                this.loader = false
                Swal.fire('¡Éxito!', 'Nomina agregada correctamente.', 'success')
                this.activeModal.close(true)
              },
              error => {
                console.log(error.error.message)
                this.loader = false
                Swal.fire('¡Error!', error.error.message, 'warning')
              })
        }
      } else {

        let is_validate_dispersion = false
        if (this.dispersion_edit.length > 0) {
          for (let i in this.dispersion_edit) {
            if (this.dispersion_edit[i].deleted == false) is_validate_dispersion = true
          }
          if (this.dispersion_files.length > 0) is_validate_dispersion = true
        } else {
          if (this.dispersion_files.length > 0) is_validate_dispersion = true
        }

        if (is_validate_dispersion == true) {

          if (this.dispersion_edit.length > 0) {
            for (let i in this.dispersion_edit) this.formData.append('dispersion_edit[' + i + '][id]', this.dispersion_edit[i].id)
            for (let i in this.dispersion_edit) this.formData.append('dispersion_edit[' + i + '][deleted]', this.dispersion_edit[i].deleted)
          }

          this.loader = true
          this.nominaService.store(this.formData)
            .subscribe(
              res => {
                console.log(res)
                this.loader = false
                Swal.fire('¡Éxito!', 'Nomina editada correctamente.', 'success')
                this.activeModal.close(true)
              },
              error => {
                console.log(error.error.message)
                this.loader = false
                Swal.fire('¡Error!', error.error.message, 'warning')
              })
        } else {
          Swal.fire('¡Atención!', 'Debe agregar un archivo por cada modalidad.', 'warning')
        }
      }
    }

  }

  Close() {
    this.activeModal.close(true)
  }//Close()

}
