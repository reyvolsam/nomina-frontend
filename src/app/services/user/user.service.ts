import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { throwError } from 'rxjs'
import { environment } from '../../../environments/environment';

import { User } from 'src/app/models/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  User: User

  constructor(private http: HttpClient) { }

  getUsers(paginator)
  {
    return this.http.get<any>(this.baseUrl+'/user'+paginator,{})
    .pipe(
      map(res => res),
      catchError( err => this.handleError(err))
    )
  }//

  saveUser(user:User)
  {
    return this.http.post<any>(this.baseUrl+'/user', user)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  updateUser(user:User)
  {
    return this.http.put<any>(this.baseUrl+'/user/'+user.id, user)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//

  deleteUser(id: Number)
  {
    return this.http.delete<any>(this.baseUrl+'/user/'+id)
    .pipe(
      map(res =>res),
      catchError( err => this.handleError(err))
    )
  }//deleteUser()

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }//

}////
