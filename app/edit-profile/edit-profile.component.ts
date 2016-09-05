import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'

@Component({
    selector: 'edit-profile',
    templateUrl: './app/edit-profile/edit-profile.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class EditProfileComponent {
    user = User

    constructor(
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        //TODO - Consumir el servicio que trae la informacion del usuario
    }
}