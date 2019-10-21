import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmployeeTypes } from 'src/app/models/EmployeeTypes'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypesService {

  baseUrl = environment.baseUrl;
  employeeTypes: EmployeeTypes

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<any>(this.baseUrl+'/employeeTypes',{})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(employeeTypes:EmployeeTypes)
  {
    return this.http.post<any>(this.baseUrl+'/employeeTypes', employeeTypes)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(employeeTypes:EmployeeTypes)
  {
    return this.http.put<any>(this.baseUrl+'/employeeTypes/'+employeeTypes.id, employeeTypes)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/employeeTypes/'+id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
