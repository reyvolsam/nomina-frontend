import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImssService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any>(this.baseUrl + '/imss')
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  store(imss: FormData) {
    return this.http.post<any>(this.baseUrl + '/imss', imss)
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  delete(id: Number) {
    return this.http.delete<any>(this.baseUrl + '/imss/' + id)
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

  searchImss(obj: any) {
    return this.http.post(`${this.baseUrl}/imss/search`, obj);
  }

}////
