import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'
import { Tramite } from '../solicitud' 

@Component({
    selector: 'edit-tramite',
    templateUrl: './app/edit-solicitud/editSolicitud.component.html',
    styleUrls: ['./app/solicitud/inbox.component.css'],
    providers: [AuthenticationService]
})


export class EditSolicitud implements OnInit {

    @Input idSolicitud: any;

    public selectSolicitud: any[];
    public param: any;

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

        
    getInfoSolicitud(): void {
        this.authService.getSolicitudProfile(localStorage.getItem('idTramite')).subscribe(response => {
            localStorage.setItem('cedula_user', <string>response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            this.selectSolicitud = response;
        }, error => {
            let jsonObject = JSON.parse(error.text());
            alert(jsonObject.message);
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

}