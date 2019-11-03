import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from 'src/app/models/Company';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServices {

  baseUrl = environment.baseUrl
  company_list: Company[] = []

  constructor(private http: HttpClient) { }

  getmenus()
  {
    
    return this.http.post<any>(this.baseUrl + '/getMenus', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }

  getCompanyCatalogFromUser()
  {
    return this.http.get<any>(this.baseUrl + '/catalogCompanies', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  getCompanyCatalogFromUserDepartments()
  {
    return this.http.get<any>(this.baseUrl + '/catalogCompaniesDepartments', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}////
