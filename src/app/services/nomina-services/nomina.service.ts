import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NominaService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  store(form: FormData)
  {
    return this.http.post<any>(this.baseUrl + '/nomina', form)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}////
