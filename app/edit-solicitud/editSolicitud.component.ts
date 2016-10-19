import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN} from "../menu_mock";
import {User} from '../user'
import {Solicitud} from '../solicitud'

@Component({
    selector: 'edit-tramite',
    templateUrl: './app/edit-solicitud/editSolicitud.component.html',
    styleUrls: ['./app/signin/signin.component.css'],
    providers: [AuthenticationService]
})


export class EditSolicitud implements OnInit {

    @Input idSolicitud: any;

    public selectSolicitud: any[];
    public param: any;
    menus: menu[];

    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
        this.menus = localStorage.getItem("type_user") === 'Ciudadano' ? MENU_CDN : MENU_ADM;
    }


    getInfoSolicitud(): void {
        this.authService.getSolicitudProfile(localStorage.getItem('idTramite')).subscribe(response => {
            localStorage.setItem('cedula_user', <string>response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            this.selectSolicitud = response;
        }, error => {
            let jsonObject = JSON.parse(error.text());
            this.toastr.error(jsonObject.message, 'Alerta');
            console.log(error.text());
            ;
        });
    }


    public returnInboxSolicitud() {
        alert("Regresar");
        let link = ['/inboxSolicitud'];
        this.router.navigate(link);
        console.log("Regresar bandeja solicitud");
    }

    ngOnInit(): void {

        this.param = this.router.url.split('/');
        /*if (this.param[2].length>0)
         alert("Detalle Trámite: " + this.param[2]);
         else
         alert("Nuevo Trámite: " + this.param[2]);*/

        //this.getInfoTramite();

    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

}