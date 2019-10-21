import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ContractTypes } from 'src/app/models/ContractTypes';

@Injectable({
  providedIn: 'root'
})
export class ContractTypesService {

  baseUrl = environment.baseUrl;
  contractTypes: ContractTypes

  constructor(private http: HttpClient) { }

  get()
  {
    return this.http.get<any>(this.baseUrl+'/contractTypes',{})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(contractTypes:ContractTypes)
  {
    return this.http.post<any>(this.baseUrl+'/contractTypes', contractTypes)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(contractTypes:ContractTypes)
  {
    return this.http.put<any>(this.baseUrl+'/contractTypes/'+contractTypes.id, contractTypes)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/contractTypes/'+id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
