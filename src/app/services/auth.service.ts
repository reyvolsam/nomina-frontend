import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable, BehaviorSubject } from 'rxjs'
import { User } from 'src/app/models/User'
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }//

}
