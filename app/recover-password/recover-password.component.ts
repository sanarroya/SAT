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
        private authService: AuthenticationService,
        private router: Router
    ) { }

    onForgotPassword(cedula : string) {
        this.authService.recoverPassword(cedula)
            .subscribe( response => {
                alert(response.message)
                this.router.navigate(['/signin']);
            }, error => {
                alert(error.json().message);
                console.log(error.text());
            })
    }
}