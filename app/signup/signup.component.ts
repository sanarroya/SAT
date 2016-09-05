import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'

@Component({
    selector: 'sign-up',
    templateUrl: '/app/signup/signup.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/signup/signup.component.css']
})

export class SignUpComponent {

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    onSignUp(cedula, nombre, email, password, confirmPassword, telefono) {
        let user = new User()
        user.cedula = cedula
        user.nombre = nombre
        user.email = email
        user.password = password
        user.confirmPassword = confirmPassword
        user.telefono = telefono
        user.tipo = <string>2

        this.authService.signUp(user)
            .subscribe( response => {
                alert("Usuario Creado");
                this.router.navigate(['/signin']);
            }, error => {
                let jsonObject = JSON.parse(error.text());
                alert(jsonObject.message);
                console.log(error.text());
            })
    }
}