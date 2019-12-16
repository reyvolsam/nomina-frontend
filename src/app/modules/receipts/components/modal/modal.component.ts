import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReceiptsService } from 'src/app/services/receipts-services/receipts.service';
import { NgbActiveModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData

  button_label = 'Crear Recibo'

  form: FormGroup
  submitted:Boolean = false
  loader:Boolean = false

  formUpload = new FormData();

  xml_edit = []
  transference1_edit = []
  transference2_edit = []

  xml_files = []
  transference1_files = []
  transference2_files = []

  constructor(
    private calendar: NgbCalendar,
    private receiptsService: ReceiptsService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.formBuilder.group({
      id: [],
      date: ['', [Validators.required]],
      period: ['', [Validators.required]],
      xml_payment: [],
      payment_transference_1: [],
      payment_transference_2: [],
      loader: [],
      created_at: [],
      updated_at: [],
      deleted_at: []
    })
  }

  ngOnInit() {
    setTimeout(() => {
      if(this.formData.id != null){
        this.xml_edit = this.formData.xml_payment
        this.transference1_edit = this.formData.payment_transference_1
        this.transference2_edit = this.formData.payment_transference_2
        this.form.setValue(this.formData)
      } else {
        let today_date = this.calendar.getToday()
        this.form.patchValue({date: today_date.day+'-'+today_date.month+'-'+today_date.year})
      }
    })
  }

  get c(){ return this.form.controls }

  onFileSelectXML(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.xml_files.push(file)
    }
  }//
  deleteFileXML = ind => this.xml_files.splice(ind, 1)
  deleteFileXMLLoaded = i => this.xml_edit[i].deleted = true

  onFileSelectTransference1(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.transference1_files.push(file)
    }
  }//
  deleteFileTransference1 = ind => this.transference1_files.splice(ind, 1)
  deleteFileTransference1Loaded = i => this.transference1_edit[i].deleted = true

  onFileSelectTransference2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.transference2_files.push(file)
    }
  }//
  deleteFileTransference2 = ind => this.transference2_files.splice(ind, 1)
  deleteFileTransference2Loaded = i => this.transference2_edit[i].deleted = true

  onSubmit()
  {
    let check_repeatedX = this.formUpload.getAll('xml_files[]')
    if(this.xml_files.length > 0){
      for(let d in this.xml_files){
        let repeatedX = false
        for(let cr in check_repeatedX){
          if(check_repeatedX[cr]['name'] == this.xml_files[d]['name']) repeatedX = true
        }
        if(repeatedX == false){
          this.formUpload.append('xml_files[]', this.xml_files[d])
        }
      }
    }

    let check_repeatedT1 = this.formUpload.getAll('transference1_files[]')
    if(this.transference1_files.length > 0){
      for(let d in this.transference1_files){
        let repeatedT1 = false
        for(let cr in check_repeatedT1){
          if(check_repeatedT1[cr]['name'] == this.transference1_files[d]['name']) repeatedT1 = true
        }
        if(repeatedT1 == false){
          this.formUpload.append('transference1_files[]', this.transference1_files[d])
        }
      }
    }

    let check_repeatedT2 = this.formUpload.getAll('transference2_files[]')
    if(this.transference2_files.length > 0){
      for(let d in this.transference2_files){
        let repeatedT2 = false
        for(let cr in check_repeatedT2){
          if(check_repeatedT2[cr]['name'] == this.transference2_files[d]['name']) repeatedT2 = true
        }
        if(repeatedT2 == false){
          this.formUpload.append('transference2_files[]', this.transference2_files[d])
        }
      }
    }

    this.formUpload.append('id', this.form.value.id)
    this.formUpload.append('date', this.form.value.date)
    this.formUpload.append('period', this.form.value.period)

    this.submitted = true
    if (this.form.invalid) {
      return;
    } else {
      this.loader = true
      if(this.form.value.id === null){

        if(this.xml_files.length == 0 && this.transference1_files.length == 0 && this.transference2_files.length == 0){
          Swal.fire('¡Atención!', 'Debe agregar por lo menos un archivo por cada sección', 'warning')
          this.loader = false
        } else {
          this.receiptsService
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

        let is_validate_xml = false
        if(this.xml_edit.length > 0){
          for(let i in this.xml_edit){
            if(this.xml_edit[i].deleted == false) is_validate_xml = true
          }
          if(this.xml_files.length > 0) is_validate_xml = true
        } else {
          if(this.xml_files.length > 0) is_validate_xml = true
        }

        let is_validate_transference1 = false
        if(this.transference1_edit.length > 0){
          for(let i in this.transference1_edit){
            if(this.transference1_edit[i].deleted == false) is_validate_transference1 = true
          }
          if(this.transference1_files.length > 0) is_validate_transference1 = true
        } else {
          if(this.transference1_files.length > 0) is_validate_transference1 = true
        }

        let is_validate_transference2 = false
        if(this.transference2_edit.length > 0){
          for(let i in this.transference2_edit){
            if(this.transference2_edit[i].deleted == false) is_validate_transference2 = true
          }
          if(this.transference2_files.length > 0) is_validate_transference2 = true
        } else {
          if(this.transference2_files.length > 0) is_validate_transference2 = true
        }

        if(is_validate_transference1 == true && is_validate_xml == true && is_validate_transference2 == true){

          if(this.xml_edit.length > 0){
            for(let i in this.xml_edit) this.formUpload.append('xml_edit['+i+'][id]', this.xml_edit[i].id)
            for(let i in this.xml_edit) this.formUpload.append('xml_edit['+i+'][deleted]', this.xml_edit[i].deleted)
          }
          if(this.transference1_edit.length > 0){
            for(let i in this.transference1_edit) this.formUpload.append('transference1_edit['+i+'][id]', this.transference1_edit[i].id)
            for(let i in this.transference1_edit) this.formUpload.append('transference1_edit['+i+'][deleted]', this.transference1_edit[i].deleted)
          }
          if(this.transference2_edit.length > 0){
            for(let i in this.transference2_edit) this.formUpload.append('transference2_edit['+i+'][id]', this.transference2_edit[i].id)
            for(let i in this.transference2_edit) this.formUpload.append('transference2_edit['+i+'][deleted]', this.transference2_edit[i].deleted)
          }

          this.receiptsService
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

  Close()
  {
    this.activeModal.close(false)
  }

}////
