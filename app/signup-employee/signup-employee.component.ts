import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ValidatorService} from '../validator/validator.service'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN} from "../menu_mock";

@Component({
    selector: 'sign-up',
    templateUrl: '/app/signup-employee/signup-employee.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
})

export class SignUpEmployeeComponent {
    menus: menu[];

    constructor(private router: Router,
                private authService: AuthenticationService,
                private toastr: ToastsManager,
                private validator: ValidatorService) {
        this.menus = localStorage.getItem("type_user") === '1' ? MENU_CDN : MENU_ADM;
    }


    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
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
        user.tipo = '2'

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
                    this.toastr.info("Empleado creado correctamente", 'Alerta');
                    this.onBack()
                }, error => {
                    let jsonObject = JSON.parse(error.text());
                    this.toastr.error(jsonObject.message, 'Alerta');
                    console.log(error.text());
                })
            }
    }

    onBack() {
        this.router.navigate(['/inboxUsuario'])
    }
}