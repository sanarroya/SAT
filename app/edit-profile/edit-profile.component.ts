import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN, MENU_FCN} from "../menu_mock";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'edit-profile',
    templateUrl: './app/edit-profile/edit-profile.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class EditProfileComponent implements OnInit {

    @Input
    selectUser = new User();
    menus: menu[];

    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
        if (localStorage.getItem("type_user") === '1') {
            this.menus = MENU_CDN;
        } else if (localStorage.getItem("type_user") === '2') {
            this.menus = MENU_FCN;
        } else {
            this.menus = MENU_ADM;
        }


    }

    getUser(): void {

        this.authService.getUserProfile(localStorage.getItem('cedula_user')).subscribe(response => {
            localStorage.setItem('cedula_user', <string>response.cedula);
            localStorage.setItem('name', response.nombre);
            this.selectUser = response;
        }, error => {
            let jsonObject = JSON.parse(error.text());
            this.toastr.error(jsonObject.message, 'Alerta');
            console.log(error.text());

        });
    }


    updateUser(cedula, nombre, email, password, confirmPassword, telefono) {
        let user = new User()
        user.cedula = cedula
        user.nombre = nombre
        user.email = email
        user.password = password
        user.confirmPassword = confirmPassword
        user.telefono = telefono
        user.tipo = localStorage.getItem('type_user');

        this.authService.updateUser(user)
            .subscribe(response => {
                this.toastr.info("Usuario actualizado", 'Alerta');
                this.router.navigate(['/editProfile']);
            }, error => {
                let jsonObject = JSON.parse(error.text());
                this.toastr.error(jsonObject.message, 'Alerta');
                console.log(error.text());
                this.router.navigate(['/editProfile']);
            })
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

    ngOnInit(): void {
        this.getUser();
    }
}