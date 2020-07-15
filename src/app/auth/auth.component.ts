import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authSerice: AuthService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        // create 1 observer and return this for both of case(login/sign up)
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            authObs = this.authSerice.login(email, password);
            // because we have 2 obs in same component we can return only 1
            // this.authSerice.login(email, password)
            //     .subscribe(
            //         resData => {
            //             console.log(resData);
            //             this.isLoading = false;
            //         },
            //         errorMessage => {
            //             console.log('#1', errorMessage);
            //             this.error = errorMessage;
            //             this.isLoading = false;
            //         }
            // );

        } else {
            authObs = this.authSerice.signup(email, password);
                // this.authSerice.login(email, password)
                // .subscribe(
                //     resData => {
                //         console.log(resData);
                //         this.isLoading = false;
                //     },
                //     errorMessage => {
                //         console.log('#1', errorMessage);
                //         this.error = errorMessage;
                //         this.isLoading = false;
                //     }
                // );
        }

        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
            },
            errorMessage => {
                console.log('#1', errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        form.reset();
    }
}
