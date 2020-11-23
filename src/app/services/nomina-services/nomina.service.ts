import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NominaService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any>(this.baseUrl + '/nomina')
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  store(formData: FormData) {
    return this.http.post<any>(this.baseUrl + '/nomina', formData)
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  delete(id: Number) {
    return this.http.delete<any>(this.baseUrl + '/nomina/' + id)
      .pipe(
        map(res => res),
        catchError(err => this.handleError(err))
      )
  }//

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error);
  }//


  searchNomina(obj: any) {
    return this, this.http.post(`${this.baseUrl}/nomina/search`, obj);
  }

}////
