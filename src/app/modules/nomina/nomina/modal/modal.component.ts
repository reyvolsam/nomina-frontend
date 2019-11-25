import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NominaService } from 'src/app/services/nomina-services/nomina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  nominaForm: FormGroup
  submitted: Boolean = false
  loader:Boolean = false
  excel_files = []
  dispersion_files = []

  formData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private nominaService: NominaService
  ) {
    this.nominaForm = this.formBuilder.group({
      id: [],
      nomina_date: ['', [Validators.required]],
      nomina_period: ['', [Validators.required]],
      obra: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  get c(){ return this.nominaForm.controls }

  onFileSelectExcel(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.excel_files.push(file)
    }
  }//

  onFileSelectDispersion(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.dispersion_files.push(file)
    }
  }//

  deleteFileExcel = ind => this.excel_files.splice(ind, 1)

  deleteFileDispersion = ind => this.dispersion_files.splice(ind, 1)

  onSubmit() {
    this.submitted = true

    for(let f in this.excel_files){
      this.formData.append('excel_files[]', this.excel_files[f])
    }
    console.log( 'excel_files', this.formData.getAll('excel_files[]') )

    for(let d in this.dispersion_files){
      this.formData.append('dispersion_files[]', this.dispersion_files[d])
    }
    console.log( 'dispersion_files', this.formData.getAll('dispersion_files[]') )
    if (this.nominaForm.invalid) {
      return;
    } else {
      this.nominaService.store(this.formData)
      .subscribe(
      res => {
        console.log(res)
        Swal.fire('Éxito!', res.message, 'success')
      },
      error => {
        console.log(error.error.message)
        Swal.fire('¡Error!', error.error.message, 'warning')
      })
    }

  }

}
