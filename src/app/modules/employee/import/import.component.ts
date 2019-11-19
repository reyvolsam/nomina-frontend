import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee-services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  importForm: FormGroup;  
  formData = new FormData();


  constructor(
    private formBuilder: FormBuilder, 
    private httpClient: HttpClient,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.importForm = this.formBuilder.group({
      employee_file: ['']
    });
  }

  onFileSelect(event) {
    console.log('event', event)
    if (event.target.files.length > 0) {
      console.log('length', event.target.files.length)
      const file = event.target.files[0];
      console.log('file', file)
      this.importForm.get('employee_file').setValue(file);
    }
  }//

  onSubmit() {
    
    //console.log('importForm', this.importForm.get('employee_file').value)
    this.formData.append('employee_file', this.importForm.get('employee_file').value);
    console.log(this.formData.get('employee_file'))

    this.employeeService.importEmployee(this.formData)
    .subscribe(
    res => {
      console.log(res)
    },
    error => {
      console.log(error.error.message)
      Swal.fire('¡Error!', error.error.message, 'warning')
    })

  }

}////
