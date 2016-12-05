import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'recover-password',
    templateUrl: './app/recover-password/recover-password.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/recover-password/recover-password.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class RecoverPasswordComponent {

    constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastsManager) {
    }

    onForgotPassword(cedula: string) {
        this.authService.recoverPassword(cedula)
            .subscribe(response => {
                this.toastr.info(response.message, 'Alerta');
                this.router.navigate(['/signin']);
            }, error => {
                this.toastr.error(error.json().message, 'Alerta');
                console.log(error.text());
            })
    }
}