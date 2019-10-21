import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PeriodTypes } from 'src/app/models/PeriodTypes'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeriodTypesService {

  baseUrl = environment.baseUrl
  periodTypes: PeriodTypes

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<any>(this.baseUrl + '/periodTypes', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(periodTypes: PeriodTypes)
  {
    return this.http.post<any>(this.baseUrl + '/periodTypes', periodTypes)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(periodTypes: PeriodTypes)
  {
    return this.http.put<any>(this.baseUrl + '/periodTypes/' + periodTypes.id, periodTypes)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: number)
  {
    return this.http.delete<any>(this.baseUrl + '/periodTypes/' + id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
