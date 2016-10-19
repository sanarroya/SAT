import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'sign-up',
    templateUrl: '/app/signup/signup.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/signup/signup.component.css']
})

export class SignUpComponent {

    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
    }

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
            .subscribe(response => {
                this.toastr.info("Usuario Creado", 'Alerta');
                this.router.navigate(['/signin']);
            }, error => {
                let jsonObject = JSON.parse(error.text());
                this.toastr.info(jsonObject.message, 'Alerta');
                console.log(error.text());
            })
    }
}