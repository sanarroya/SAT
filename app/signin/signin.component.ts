import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'sing-in',
    templateUrl: './app/signin/signin.component.html',
    styleUrls: ['./app/signin/signin.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class SignInComponent {

    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
    }

    onSignIn(cedula, password) {
        let user = new User()
        user.cedula = cedula
        user.password = password

        this.authService.signIn(user)
            .subscribe(response => {
                localStorage.setItem('cedula_user', <string>response.usuario.cedula);
                localStorage.setItem('id_token', response.token);
                localStorage.setItem('name', response.usuario.nombre);
                localStorage.setItem('type_user', response.usuario.tipo);
                this.router.navigate(['/inboxTramite']);
            }, error => {
                let jsonObject = JSON.parse(error.text());
                this.toastr.error("", 'Email o contraseña invalidos');
                this.router.navigate(['/inboxTramite']);
            })
    }

    onRecoverPassword() {
        this.router.navigate(['/recoverPassword'])
    }

    onSingup() {
        this.router.navigate(['/signup']);
    }
}