import { Injectable } from '@angular/core';
import { Department } from 'src/app/models/Department';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = environment.baseUrl
  department: Department

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<any>(this.baseUrl + '/departments', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(department: Department)
  {
    return this.http.post<any>(this.baseUrl + '/departments', department)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(department: Department)
  {
    return this.http.put<any>(this.baseUrl + '/departments/' + department.id, department)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: number)
  {
    return this.http.delete<any>(this.baseUrl + '/departments/' + id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
