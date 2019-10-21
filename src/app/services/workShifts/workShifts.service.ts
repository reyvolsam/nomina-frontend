import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WorkShifts } from 'src/app/models/WorkShifts';

@Injectable({
  providedIn: 'root'
})
export class WorkShiftsService {

  baseUrl = environment.baseUrl;
  workShifts: WorkShifts

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<any>(this.baseUrl+'/workShifts',{})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(workShifts:WorkShifts)
  {
    return this.http.post<any>(this.baseUrl+'/workShifts', workShifts)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(workShifts:WorkShifts)
  {
    return this.http.put<any>(this.baseUrl+'/workShifts/'+workShifts.id, workShifts)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/workShifts/'+id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
