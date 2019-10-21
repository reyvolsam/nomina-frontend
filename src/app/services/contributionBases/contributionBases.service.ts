import { Injectable } from '@angular/core';
import { ContributionBases } from 'src/app/models/ContributionBases'
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributionBasesService {

  baseUrl = environment.baseUrl;
  contributionBases: ContributionBases

  constructor(private http: HttpClient) { }

  get()
  {
    return this.http.get<any>(this.baseUrl+'/contributionBases',{})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  store(contributionBases:ContributionBases)
  {
    return this.http.post<any>(this.baseUrl+'/contributionBases', contributionBases)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  update(contributionBases:ContributionBases)
  {
    return this.http.put<any>(this.baseUrl+'/contributionBases/'+contributionBases.id, contributionBases)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  delete(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/contributionBases/'+id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
