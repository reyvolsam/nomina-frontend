import { Injectable } from '@angular/core';
import { DiscountTypes } from 'src/app/models/DiscountTypes';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountTypesService {

  baseUrl = environment.baseUrl
  DiscountTypes: DiscountTypes

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<any>(this.baseUrl + '/discountTypes', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(discountTypes: DiscountTypes)
  {
    return this.http.post<any>(this.baseUrl + '/discountTypes', discountTypes)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(discountTypes: DiscountTypes)
  {
    return this.http.put<any>(this.baseUrl + '/discountTypes/' + discountTypes.id, discountTypes)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: number)
  {
    return this.http.delete<any>(this.baseUrl + '/discountTypes/' + id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
