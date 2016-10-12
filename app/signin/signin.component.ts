import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'

@Component({
    selector: 'sing-in',
    templateUrl: './app/signin/signin.component.html',
    styleUrls: ['./app/signin/signin.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class SignInComponent {

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    onSignIn(cedula, password) {
        let user = new User()
        user.cedula = cedula
        user.password = password

        this.authService.signIn(user)
            .subscribe( response => {
                localStorage.setItem('cedula_user',<string>response.usuario.cedula);
                localStorage.setItem('id_token', response.token);
                localStorage.setItem('name', response.usuario.nombre);
                localStorage.setItem('type_user', response.usuario.tipo);
                this.router.navigate(['/editProfile']);
            }, error => {
                let jsonObject = JSON.parse(error.text());
                alert(jsonObject.message);
                console.log(error.text());
                this.router.navigate(['/editProfile']);
            })
    }

    onRecoverPassword() {
        this.router.navigate(['/recoverPassword'])
    }

    onSingup(){
        this.router.navigate(['/signup']);
    }
}