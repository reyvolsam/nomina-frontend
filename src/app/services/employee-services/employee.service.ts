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
  
  importEmployee(employee_file: FormData)
  {
    return this.http.post<any>(this.baseUrl+'/work/import', employee_file)
    .pipe(
      map(res => {
        return res
      }),
      catchError( err => this.handleError(err))
    )
  }//convertEmployee()

  convertEmployee(work_status_id: Number, employee_id: Number)
  {
    return this.http.post<any>(this.baseUrl+'/work/convert', { work_status_id: work_status_id, employee_id: employee_id })
    .pipe(
      map(res => {
        return res
      }),
      catchError( err => this.handleError(err))
    )
  }//convertEmployee()

  getEmployees(work_status_id: Number)
  {
    return this.http.post<any>(this.baseUrl+'/workByStatus', {work_status_id: work_status_id})
    .pipe(
      map(res => {
        return res
      }),
      catchError( err => this.handleError(err))
    )
  }//getEmployees()

  saveEmployee(employee: Work)
  {
    return this.http.post<any>(this.baseUrl+'/work', employee)
    .pipe(
      map(res => {
        console.log(res)
        return res
      }),
      catchError( err => this.handleError(err))
    )
  }//saveEmployee()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}