import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN} from "../menu_mock";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'usuario',
    templateUrl: './app/usuario/inbox.component.html',
    styleUrls: ['./app/signin/signin.component.css','./app/usuario/inbox.component.css', './app/usuario/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxUsuarioComponent implements OnInit {

    public selectUsuario: User[];
    public username;
    menus: menu[];

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private toastr: ToastsManager
    ) { this.menus = localStorage.getItem("type_user") === '1' ? MENU_CDN : MENU_ADM;}

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

    public removeItem(item: any) {
        this.toastr.info("Eliminar: " + item.id, 'Alerta');
        console.log("Remove: ", item.id);
    }

    public editItem(item: any) {
        this.toastr.info("Editar: " + item.id, 'Alerta');
        let link = ['/editProfile', item.cedula];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    }

    public newItem() {
        this.toastr.info("Nuevo Usuario", 'Alerta');
        let link = ['/newuserin'];
        this.router.navigate(link);
        console.log("Nuevo Uusuario");
    }

    ngOnInit(): void {
        //noinspection TypeScriptValidateTypes
        this.selectUsuario = [
            { nombre: 'Maria Antonia Ochoa Perez', cedula: 1234, email: 'mochoa@correo.com', tipo:'1', telefono: '', confirmPassword:'',password:'' },
            { nombre: 'Juan Carlos Marin Lopez', cedula: 2345, email: 'jlopez@correo.com', tipo: '1', telefono: '', confirmPassword: '', password: ''},
            { nombre: 'Johana Patricia Rojas Pinto', cedula: 3456, email: 'jpinto@correo.com', tipo: '1', telefono: '', confirmPassword: '', password: ''},
            { nombre: 'Rosa Cecilia Sanchez Gil', cedula: 4567, email: 'rsanchez@correo.com', tipo: '1', telefono: '', confirmPassword: '', password: ''}
        ];

        this.username = "Administrador";
        //this.getAllUsuarios();

    }

    getAllUsuarios() {
        this.authService.getAllUsuarios()
            .subscribe(
            response => {
                this.selectUsuario = response;
            },
            error => {
                this.toastr.error('hay un error', 'Alerta');
                this.toastr.error(error.text(), 'Alerta');
                console.log(error.text());
            }
            );
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

}