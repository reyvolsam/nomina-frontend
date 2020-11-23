import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Work } from 'src/app/models/Work';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  importEmployee(employee_file: FormData) {
    return this.http.post<any>(this.baseUrl + '/work/import', employee_file)
      .pipe(
        map(res => {
          return res
        }),
        catchError(err => this.handleError(err))
      )
  }//convertEmployee()

  convertEmployee(work_status_id: Number, employee_id: Number) {
    return this.http.post<any>(this.baseUrl + '/work/convert', { work_status_id: work_status_id, employee_id: employee_id })
      .pipe(
        map(res => {
          return res
        }),
        catchError(err => this.handleError(err))
      )
  }//convertEmployee()

  getEmployees(pagination: String, work_status_id: Number, filter) {
    return this.http.post<any>(this.baseUrl + '/workByStatus' + pagination,
      {
        work_status_id: work_status_id,
        code: filter.code,
        name: filter.name,
        first_name: filter.first_name,
        last_name: filter.last_name,
        email: filter.email
      })
      .pipe(
        map(res => {
          return res
        }),
        catchError(err => this.handleError(err))
      )
  }//getEmployees()

  createEmployee(employee: Work) {
    return this.http.post<any>(this.baseUrl + '/work', employee)
      .pipe(
        map(res => {
          return res
        }),
        catchError(err => this.handleError(err))
      )
  }//saveEmployee()

  updateEmployee(employee: Work) {
    return this.http.put<any>(this.baseUrl + '/work/' + employee.id, employee)
      .pipe(
        map(res => {
          return res
        }),
        catchError(err => this.handleError(err))
      )
  }//saveEmployee()

  uploadDoc(documentation: FormData) {
    return this.http.post<any>(this.baseUrl + '/work/uploadDoc', documentation)
      .pipe(
        map(res => {
          return res
        }),
        catchError(err => this.handleError(err))
      )
  }//uploadDoc()

  getEmployeeData(employee_id: Number) {
    return this.http.post<any>(this.baseUrl + '/work/loadData', { employee_id: employee_id })
      .pipe(
        map(res => {
          return res
        }),
        catchError(err => this.handleError(err))
      )
  }//saveEmployee()

  deleteEmployee(employee_id: Number) {
    return this.http.delete<any>(this.baseUrl + '/work/' + employee_id,)
      .pipe(
        map(res => {
          return res
        }),
        catchError(err => this.handleError(err))
      )
  }//saveEmployee()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//


  //servicio para guardar documentos de incidencias
  uploadFilesIncidents(obj: any) {
    return this.http.post(`${this.baseUrl}/work/uploadFileIncidents`, obj);
  }

}
