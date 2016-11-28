import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN, MENU_FCN} from "../menu_mock";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {EditEmployeeService} from '../edit-employee-profile/edit-employee-service'

@Component({
    selector: 'edit-profile',
    templateUrl: './app/edit-employee-profile/edit-employee-profile.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class EditEmployeeProfileComponent implements OnInit {

    selectUser = new User();
    menus: menu[];

    constructor(private router: Router, 
                private authService: AuthenticationService, 
                private editEmployeeService: EditEmployeeService,
                private toastr: ToastsManager) {
        if (localStorage.getItem("type_user") === '1') {
            this.menus = MENU_CDN;
        } else if (localStorage.getItem("type_user") === '2') {
            this.menus = MENU_FCN;
        } else {
            this.menus = MENU_ADM;
        }


    }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        this.selectUser = this.editEmployeeService.employee
    }


    updateUser(cedula, nombre, email, password, confirmPassword, telefono) {
        let user = new User()
        user.cedula = cedula
        user.nombre = nombre
        user.email = email
        user.password = password
        user.confirmPassword = confirmPassword
        user.telefono = telefono
        user.tipo = '2'

        this.authService.updateUser(user)
            .subscribe(response => {
                this.toastr.info("Usuario actualizado", 'Alerta');
                this.onBack()
            }, error => {
                let jsonObject = JSON.parse(error.text());
                this.toastr.error(jsonObject.message, 'Alerta');
            })
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

    onBack() {
        this.editEmployeeService.employee = new User()
        this.router.navigate(['/inboxUsuario'])
    }
}