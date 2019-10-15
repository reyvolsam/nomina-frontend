import {Injectable} from '@angular/core'
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { Router } from '@angular/router'

import {AuthService} from '../services/auth.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService,private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authService.currentUserValue
        if(currentUser){
            request = request.clone({
                setHeaders:{
                    Authorization:`Bearer ${currentUser.access_token}`
                }
            })
        }
        return next.handle(request).pipe(
            map((event:HttpEvent<any>) => {
                if(event instanceof HttpResponse){
                    console.log('EXITO')
                }
                return event
            }, (err:any) => {
                if(err instanceof HttpErrorResponse){
                    if(err.status === 401){
                        console.log('NO AUTORIZADO')
                        this.router.navigateByUrl('login')
                    }
                }
            }))
    }//
}
