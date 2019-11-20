import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee-services/employee.service';
import Swal from 'sweetalert2';
import { Company } from 'src/app/models/Company';
import { SharedServices } from 'src/app/services/shared-services/shared-services.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  importForm: FormGroup;
  formData = new FormData();
  loader_data: Boolean = false
  companies_list: Company[] = []
  submitted: Boolean = false
  import_loader: Boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private sharedServices: SharedServices,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.importForm = this.formBuilder.group({
      employee_file: ['', [Validators.required]],
      company_id: [null, [Validators.required]],
    });

    this.getCompanyCatalogFromUser()
  }

  get c(){ return this.importForm.controls }


  getCompanyCatalogFromUser()
  {
    this.loader_data = true
    this.sharedServices.getCompanyCatalogFromUser()
    .subscribe(
      res => {
        console.log(res)
        this.loader_data = false
        this.companies_list = res.data
        this.companies_list.unshift({id: null, name: 'Seleccione una empresa...', contact: '', rfc: '', telephone: ''})
        if(this.companies_list.length == 0){
          Swal.fire('¡Atención!', res.message, 'warning')
        }
      },
      error => {
        this.loader_data = false
        Swal.fire('¡Error!', error.error.message, 'warning')
      })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.importForm.get('employee_file').setValue(file);
    }
  }//

  onSubmit() {

    this.submitted = true
    if (this.importForm.invalid) {
      return;
    } else {
      //console.log('importForm', this.importForm.get('employee_file').value)
      this.formData.append('employee_file', this.importForm.get('employee_file').value);
      this.formData.append('company_id', this.importForm.get('company_id').value);
      this.import_loader = true
      this.employeeService.importEmployee(this.formData)
      .subscribe(
      res => {
        this.import_loader = false
        Swal.fire('Éxito!', res.message, 'success')
        console.log(res)
      },
      error => {
        console.log(error.error.message)
        this.import_loader = false
        Swal.fire('¡Error!', error.error.message, 'warning')
      })
    }

  }

}////
