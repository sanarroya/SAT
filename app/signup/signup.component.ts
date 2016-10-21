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
            this.toastr.error("Por favor ingrese un documento valido", "Alerta")
        } else if(!this.validator.isEmailValid(user.email)) {
            this.toastr.error("Por favor ingrese un email valido", "Alerta")
            alert("Por favor ingrese un email valido")
        } else if(!this.validator.isPasswordValid(user.password)) {
            this.toastr.error("Por favor ingrese una contraseña valida: 8-16 caracteres, un numero, una minuscula, una mayuscula y uno de los siguientes caracteres !%*$", "Alerta")
        } else if(!this.validator.isPasswordValid(user.confirmPassword)) {
            this.toastr.error("Por favor ingrese una contraseña valida: 8-16 caracteres, un numero, una minuscula, una mayuscula y uno de los siguientes caracteres !%*$", "Alerta")
        } else if(!this.validator.passwordsMatch(user.password, user.confirmPassword)) {
            this.toastr.error("Las contraseñas no coinciden", "Alerta")
        } else if(!this.validator.isPhoneValid(user.telefono)) {
            this.toastr.error("Por favor ingrese un teléfono valido", "Alerta")
        } else {
            this.authService.signUp(user)
                .subscribe(response => {
                    this.toastr.info("Usuario Creado", 'Alerta');
                    this.router.navigate(['/signin']);
                }, error => {
                    let jsonObject = JSON.parse(error.text());
                    this.toastr.error(jsonObject.message, 'Alerta');
                    console.log(error.text());
                })
            }
    }
}