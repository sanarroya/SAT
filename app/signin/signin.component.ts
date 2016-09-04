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
        private authService: AuthenticationService
    ) { }

    onSignIn(cedula, password) {
        let user = new User()
        user.cedula = cedula
        user.password = password

        this.authService.signIn(user)
            .subscribe( response => {
                localStorage.setItem('id_token', response.token);
                localStorage.setItem('name', response.usuario.nombre);
                localStorage.setItem('type_user', response.usuario.tipo);
            }, error => {
                alert(error.text());
                console.log(error.text());
            })
    }    
}