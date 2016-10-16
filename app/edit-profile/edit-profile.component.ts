import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN} from "../menu_mock";


@Component({
    selector: 'edit-profile',
    templateUrl: './app/edit-profile/edit-profile.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class EditProfileComponent implements OnInit {

    selectUser = User()
    menus: menu[];

    constructor(private router: Router, private authService: AuthenticationService) {
        this.menus = localStorage.getItem("type_user") == 'Ciudadano' ? MENU_CDN : MENU_ADM;
    }

    getUser(): void {
        this.authService.getUserProfile(localStorage.getItem('cedula_user')).subscribe(response => {
            localStorage.setItem('cedula_user', <string>response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            this.selectUser = response;
        }, error => {
            let jsonObject = JSON.parse(error.text());
            alert(jsonObject.message);
            console.log(error.text());
            ;
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
                alert("Usuario actualizado");
                this.router.navigate(['/editProfile']);
            }, error => {
                let jsonObject = JSON.parse(error.text());
                alert(jsonObject.message);
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