import { Injectable } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = environment.baseUrl;
  Company: Company

  constructor(private http: HttpClient) { }

  get()
  {
    return this.http.get<any>(this.baseUrl+'/company',{})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(company:Company)
  {
    return this.http.post<any>(this.baseUrl+'/company', company)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(company:Company)
  {
    return this.http.put<any>(this.baseUrl+'/company/'+company.id, company)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/company/'+id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
