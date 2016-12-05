import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {User} from '../user';
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN, MENU_FCN} from "../menu_mock";
import {Tramite} from '../tramite';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Solicitud} from "../solicitud";

@Component({
    selector: 'tramite',
    templateUrl: './app/solicitud/inbox.component.html',
    styleUrls: ['./app/signin/signin.component.css','./app/solicitud/inbox.component.css', './app/solicitud/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxSolicitudComponent implements OnInit {

    public selectSolicitud: Tramite[];
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

    public editItem(item: Solicitud) {
        localStorage.setItem("solicitud2", JSON.stringify(item));
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
        if(this.user) {
            this.getRequestsOfUser()
        } else {
            this.getRequests()
        }

    }

    getRequests() {
        this.authService.getRequests().subscribe(
            response => {
                this.selectSolicitud = response
                console.log(response)
            },
            error => {
                this.toastr.error(error.text(), 'Alerta')
            }
        )
    }

    getRequestsOfUser() {
        this.authService.getRequestsByUser(localStorage.getItem('cedula_user')).subscribe(
            response => {
                this.selectSolicitud = response
                console.log(response)
            },
            error => {
                this.toastr.error(error.text(), 'Alerta')
            }
        )
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }



}