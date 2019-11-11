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
