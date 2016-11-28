import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user';
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN, MENU_FCN} from "../menu_mock";
import { Solicitud } from '../solicitud';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'tramite',
    templateUrl: './app/solicitud/inbox.component.html',
    styleUrls: ['./app/signin/signin.component.css','./app/solicitud/inbox.component.css', './app/solicitud/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxSolicitudComponent implements OnInit {

    public selectSolicitud: Solicitud[];
    public username;
    menus: menu[];
    user = false

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private toastr: ToastsManager
    ) {
        if (localStorage.getItem("type_user") === '1') {
            this.menus = MENU_CDN
            this.user = true
        } else if (localStorage.getItem("type_user") === '2') {
            this.menus = MENU_FCN
            this.user = false
        } else {
            this.menus = MENU_ADM
            this.user = false
        }
    }

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

    public removeItem(item: any) {
        this.toastr.info("eliminar: " + item.id, 'Alerta');
        console.log("Remove: ", item.id);
    }

    public editItem(item: any) {
        this.toastr.info("Editar" + item.id, 'Alerta');
        let link = ['/editSolicitud', item.id];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    }

    public newItem() {
        this.toastr.info("Nueva Solicitud", 'Alerta');
        let link = ['/editSolicitud', 0];
        this.router.navigate(link);
        console.log("Nueva Solicitud");
    }

    ngOnInit(): void {
        //alert("Bandeja Solicitud");
        this.selectSolicitud = [
            { descripcion: 'descripicion de solicitud 1', nombre: 'solicitud 1', id: 1 },
            { descripcion: 'descripicion de solicitud 2', nombre: 'solicitud 2', id: 2 },
            { descripcion: 'descripicion de solicitud 3', nombre: 'solicitud 3', id: 3 },
            { descripcion: 'descripicion de solicitud 4', nombre: 'solicitud 4', id: 4 }
        ];

        this.username = "Administrador";
        //this.getAllSolicitudes();

    }

    getAllSolicitudes() {
        this.authService.getAllSolicitudes()
            .subscribe(
            response => {
                this.selectSolicitud = response;
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