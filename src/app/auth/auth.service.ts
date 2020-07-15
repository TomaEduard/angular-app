import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expireIn: string;
    localId: string;
    registered?: boolean; // because the signup response not send this but login will do
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                '',
                {
                    // tslint:disable-next-line:object-literal-shorthand
                    email: email,
                    // tslint:disable-next-line:object-literal-shorthand
                    password: password,
                    returnSecureToken: true
                }
                // Error message conversion logic
            ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            '',
            {
                // tslint:disable-next-line:object-literal-shorthand
                email: email,
                // tslint:disable-next-line:object-literal-shorthand
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    // share method for login and sign up
    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        // create a generic error message
        let errorMessage = 'An error occurred!';
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
