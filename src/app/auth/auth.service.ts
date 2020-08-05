import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { API_KEY, FIREBASE_WEB_API_KEY } from 'config';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; // because the signup response not send this but login will do
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  // user = new Subject<User>();
  // get access to the current user either you only subscribe after that user has been emitted
  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {}

  signup(email: string, password: string) {
    const endpoint = `${API_KEY}signupNewUser?key=${FIREBASE_WEB_API_KEY}`;
    return this.http
      .post<AuthResponseData>(
        // 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=FIREBASE_WEB_API_KEY',
        endpoint,
        {
          // tslint:disable-next-line:object-literal-shorthand
          email: email,
          // tslint:disable-next-line:object-literal-shorthand
          password: password,
          returnSecureToken: true
        }
      )
      // Error message conversion logic
      // tap run some code with the data receive from the observable without stop/changing the response
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    const endpoint = `${API_KEY}verifyPassword?key=${FIREBASE_WEB_API_KEY}`;
    return this.http
      .post<AuthResponseData>(
        // 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=FIREBASE_WEB_API_KEY',
        endpoint,
        {
          // tslint:disable-next-line:object-literal-shorthand
          email: email,
          // tslint:disable-next-line:object-literal-shorthand
          password: password,
          returnSecureToken: true
        }
      )

      // Error message conversion logic
      // tap run some code with the data receive from the observablewithout stop/changing the response
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(
        userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log('autoLogout - ', expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // share method for login and sign up
  private handleError(errorRes: HttpErrorResponse) {
     // create a generic error message
    let errorMessage = 'An unknown error occurred!';
    // verify if error response have error field
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    // if have error field
    // override the error message(if comming EMAIL_EXIST, ...)
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
