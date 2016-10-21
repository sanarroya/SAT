import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ValidatorService} from '../validator/validator.service'

@Component({
    selector: 'sign-up',
    templateUrl: '/app/signup/signup.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/signup/signup.component.css']
})

export class SignUpComponent {

    constructor(private router: Router, 
                private authService: AuthenticationService, 
                private toastr: ToastsManager,
                private validator: ValidatorService) {
    }

    onSignUp(cedula, nombre, email, password, confirmPassword, telefono) {
        let user = new User()
        console.log(cedula)
        user.cedula = (<number>cedula).toString()
        user.nombre = nombre
        user.email = email
        user.password = password
        user.confirmPassword = confirmPassword
        user.telefono = telefono
        user.tipo = "2"

        if(!this.validator.isDocumentValid(user.cedula)) {
            alert("Por favor ingrese un documento valido")
        } else if(!this.validator.isEmailValid(user.email)) {
            alert("Por favor ingrese un email valido")
        } else if(!this.validator.isPasswordValid(user.password)) {
            alert("Por favor ingrese una contraseña valida")
        } else if(!this.validator.isPasswordValid(user.confirmPassword)) {
            alert("Por favor ingrese una contraseña valida")
        } else if(!this.validator.passwordsMatch(user.password, user.confirmPassword)) {
            alert("Las claves no coinciden")
        } else if(!this.validator.isPhoneValid(user.telefono)) {
            alert("Por favor ingrese un telegono valido")
        } else {
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
}