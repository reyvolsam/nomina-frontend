import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Receipts } from 'src/app/models/Receipts';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any>(this.baseUrl + '/receipts')
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  store(receipts: FormData) {
    return this.http.post<any>(this.baseUrl + '/receipts', receipts)
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  delete(id: Number) {
    return this.http.delete<any>(this.baseUrl + '/receipts/' + id)
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

  searchReceipt(obj: any) {
    return this.http.post(`${this.baseUrl}/receipts/search`, obj);
  }

}////
