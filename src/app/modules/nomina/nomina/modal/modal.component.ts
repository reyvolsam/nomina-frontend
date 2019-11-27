import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NominaService } from 'src/app/services/nomina-services/nomina.service';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formDataEdit;

  nominaForm: FormGroup
  submitted: Boolean = false
  loader:Boolean = false
  excel_files = []
  dispersion_files = []

  excel_edit = []
  dispersion_edit = []

  formData = new FormData();

  button_label = 'Crear Nomina'

  constructor(
    private formBuilder: FormBuilder,
    private nominaService: NominaService,
    public activeModal: NgbActiveModal
  ) {
    this.nominaForm = this.formBuilder.group({
      id: [],
      date: ['', [Validators.required]],
      period: ['', [Validators.required]],
      obra: ['', [Validators.required]],
      nomina_excel: [],
      nomina_dispersion: [],
      created_at: [],
      updated_at: [],
      deleted_at: []
    })
  }

  ngOnInit() {
    //console.log('this.formDataEdit', this.formDataEdit)
    setTimeout(() => {
      if(this.formDataEdit.id != null){
        this.button_label = 'Editar Nomina';
        if(this.formDataEdit.date != null){
          let date = this.formDataEdit.date.split('-')
          this.formDataEdit.date = {year: parseInt(date[0]), month: parseInt(date[1]), day: parseInt(date[2])};
        }
        if(this.formDataEdit.period != null){
          let period = this.formDataEdit.period.split('-')
          this.formDataEdit.period = {year: parseInt(period[0]), month: parseInt(period[1]), day: parseInt(period[2])};
        }

        this.excel_edit = this.formDataEdit.nomina_excel
        this.dispersion_edit = this.formDataEdit.nomina_dispersion

        this.nominaForm.setValue(this.formDataEdit)
      }
    })
  }

  get c(){ return this.nominaForm.controls }

  onFileSelectExcel(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.excel_files.push(file)
    }
  }//

  onFileSelectDispersion(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.dispersion_files.push(file)
    }
  }//

  deleteFileExcel = ind => this.excel_files.splice(ind, 1)

  deleteFileDispersion = ind => this.dispersion_files.splice(ind, 1)

  deleteFileExcelLoaded = i => this.excel_edit[i].deleted = true

  deleteFileDispersionLoaded = i => this.dispersion_edit[i].deleted = true

  onSubmit() {

    this.submitted = true

    let check_repeated = this.formData.getAll('excel_files[]')

    if(this.excel_files.length > 0){
      for(let f in this.excel_files){
        let repeated = false
        for(let cr in check_repeated){
          if(check_repeated[cr]['name'] == this.excel_files[f]['name']) repeated = true
        }
        if(repeated == false){
          this.formData.append('excel_files[]', this.excel_files[f])
        }
      }
    }
    //console.log( 'excel_files', this.formData.getAll('excel_files[]') )

    let check_repeatedD = this.formData.getAll('dispersion_files[]')
    if(this.dispersion_files.length > 0){
      for(let d in this.dispersion_files){
        let repeatedD = false
        for(let cr in check_repeatedD){
          if(check_repeatedD[cr]['name'] == this.dispersion_files[d]['name']) repeatedD = true
        }
        if(repeatedD == false){
          this.formData.append('dispersion_files[]', this.dispersion_files[d])
        }
      }
    }
    //console.log( 'dispersion_files', this.formData.getAll('dispersion_files[]') )
    //console.log('this.nominaForm.value', this.nominaForm.value)

    this.formData.append('id', this.nominaForm.value.id)

    let nomina_date = this.nominaForm.value.date
    this.formData.append('date', nomina_date.year+'-'+nomina_date.month+'-'+nomina_date.day)

    let nomina_period = this.nominaForm.value.period
    this.formData.append('period', nomina_period.year+'-'+nomina_period.month+'-'+nomina_period.day)

    this.formData.append('obra', this.nominaForm.value.obra)

    if (this.nominaForm.invalid) {
      return;
    } else {
      if(this.nominaForm.value.id == null){

        if(this.excel_files.length == 0 || this.dispersion_files.length == 0){
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

        let is_validate_excel = false
        if(this.excel_edit.length > 0){
          for(let i in this.excel_edit){
            if(this.excel_edit[i].deleted == false) is_validate_excel = true
          }
          if(this.excel_files.length > 0) is_validate_excel = true
        } else {
          if(this.excel_files.length > 0) is_validate_excel = true
        }

        let is_validate_dispersion = false
        if(this.dispersion_edit.length > 0){
          for(let i in this.dispersion_edit){
            if(this.dispersion_edit[i].deleted == false) is_validate_dispersion = true
          }
          if(this.dispersion_files.length > 0) is_validate_dispersion = true
        } else {
          if(this.dispersion_files.length > 0) is_validate_dispersion = true
        }

        if(is_validate_excel == true && is_validate_dispersion == true){

          if(this.excel_edit.length > 0){
            for(let i in this.excel_edit) this.formData.append('excel_edit['+i+'][id]', this.excel_edit[i].id)
            for(let i in this.excel_edit) this.formData.append('excel_edit['+i+'][deleted]', this.excel_edit[i].deleted)
          }

          if(this.dispersion_edit.length > 0){
            for(let i in this.dispersion_edit) this.formData.append('dispersion_edit['+i+'][id]', this.dispersion_edit[i].id)
            for(let i in this.dispersion_edit) this.formData.append('dispersion_edit['+i+'][deleted]', this.dispersion_edit[i].deleted)
          }

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
        } else {
          Swal.fire('¡Atención!', 'Debe agregar un archivo por cada modalidad.', 'warning')
        }
      }
    }

  }

  Close()
  {
    this.activeModal.close(true)
  }//Close()

}
