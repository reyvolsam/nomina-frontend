import { Injectable } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobServices {

  baseUrl = environment.baseUrl
  job: Job

  constructor(private http: HttpClient) { }

  getDepartmentFromCompany(company_id: number)
  {
    return this.http.post<any>(this.baseUrl + '/getDepartmentFromCompany', {company_id: company_id})
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  get(){
    return this.http.get<any>(this.baseUrl + '/jobs', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(job: Job)
  {
    return this.http.post<any>(this.baseUrl + '/jobs', job)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(jobs: Job)
  {
    return this.http.put<any>(this.baseUrl + '/jobs/' + jobs.id, jobs)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: number)
  {
    return this.http.delete<any>(this.baseUrl + '/jobs/' + id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
