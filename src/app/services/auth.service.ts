import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable, BehaviorSubject, throwError } from 'rxjs'
import { User } from 'src/app/models/User'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl

  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }//

  login(email:string, password:string)
  {
    return this.http.post<any>(this.baseUrl+'/auth/login', {email,password})
    .pipe(
      map(
        res => this.setSession(res)
      ),
      catchError( err => this.handleError(err))
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  };

  public get currentUserValue(): User{
    return this.currentUserSubject.value
  }
  private setSession(authResult)
  {
    const expires_at = moment(authResult.expires_at).valueOf()

    authResult.expires_at = JSON.stringify(expires_at)
    localStorage.setItem('currentUser', JSON.stringify(authResult));
    this.currentUserSubject.next(authResult)
    return authResult;
  }//

  logout()
  {
    return this.http.post<any>(this.baseUrl+'/auth/logout', {})
    .pipe(
      map(
        res => {
          localStorage.removeItem('currentUser')
          this.currentUserSubject.next(null)
        }
      ),
      catchError( err => this.handleError(err))
    )
  }//

  public isLoggedIn()
  {
    if(localStorage.getItem("currentUser") === null){
      return false
    } else {
      return moment().isBefore(this.getExpiration())
    }
  }//

  isLoggedOut()
  {
    return !this.isLoggedIn()
  }//

  getExpiration()
  {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const expiration = currentUser.expires_at
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
  }//

}
