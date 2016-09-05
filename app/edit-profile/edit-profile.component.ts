import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user'

@Component({
    selector: 'edit-profile',
    templateUrl: './app/edit-profile/edit-profile.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class EditProfileComponent implements OnInit {

    selectUser = User();

    constructor(private router: Router,
                private authService: AuthenticationService) {
    }

    getUser(): void {
        this.authService.getUserProfile(localStorage.getItem('cedula_user')).subscribe(response => {
            localStorage.setItem('cedula_user', <string>response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            this.selectUser = response;
        }, error => {
            alert(error.text());
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
                alert(error.text());
                console.log(error.text());
                this.router.navigate(['/editProfile']);
            })
    }


    ngOnInit(): void {
        this.getUser();
    }
}