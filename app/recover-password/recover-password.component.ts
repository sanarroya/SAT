import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'

@Component({
    selector: 'recover-password',
    templateUrl: './app/recover-password/recover-password.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/recover-password/recover-password.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class RecoverPasswordComponent {

    constructor(
        private authService: AuthenticationService
    ) { }

    onForgotPassword(email) {
        this.authService.recoverPassword(email)
            .subscribe( response => {

            }, error => {
                alert(error.text());
                console.log(error.text());
            })
    }
}