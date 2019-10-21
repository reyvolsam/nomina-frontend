import { Injectable } from '@angular/core';
import { MethodPayment } from 'src/app/models/MethodPayment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodPaymentService {

  baseUrl = environment.baseUrl
  workShifts: MethodPayment

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<any>(this.baseUrl + '/paymentMethods', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(methodPayment: MethodPayment)
  {
    return this.http.post<any>(this.baseUrl + '/paymentMethods', methodPayment)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(methodPayment: MethodPayment)
  {
    return this.http.put<any>(this.baseUrl + '/paymentMethods/' + methodPayment.id, methodPayment)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: number)
  {
    return this.http.delete<any>(this.baseUrl + '/paymentMethods/' + id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
