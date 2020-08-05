import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            // I only take 1 value from that observable and after automatically unsubscribe
            // It's alternative of .subscribe() and .unsubscribe()
            take(1),
            // exhaustMap wait for first observable to complete cuz we need the data from
            // user(the token more exactly) and add it to queryparam
            exhaustMap(user => {  // user is the data from first observable
                // if user is null not try to add it on query param (this is for login/signup)
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token) // ?auth={user.token}
                });
                return next.handle(modifiedReq);
            })
        );
    }

}
