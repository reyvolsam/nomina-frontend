import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Group } from 'src/app/models/Group'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GroupServices {

  baseUrl = environment.baseUrl;
  group: Group

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<any>(this.baseUrl + '/group', {})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}
