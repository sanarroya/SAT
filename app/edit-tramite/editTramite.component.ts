import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'
import { Tramite } from '../tramite' 

@Component({
    selector: 'edit-tramite',
    templateUrl: './app/edit-tramite/editTramite.component.html',
    styleUrls: ['./app/tramite/inbox.component.css'],
    providers: [AuthenticationService]
})


export class EditTramite implements OnInit {

    @Input idTramite: any;

    public selectTramite: any[];
    public param: any;

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

        
    getInfoTramite(): void {
        this.authService.getTramiteProfile(localStorage.getItem('idTramite')).subscribe(response => {
            localStorage.setItem('cedula_user', <string>response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            this.selectTramite = response;
        }, error => {
            let jsonObject = JSON.parse(error.text());
            alert(jsonObject.message);
            console.log(error.text());
            ;
            });
    }

   
    public returnInboxTramite() {
        alert("Regresar");
        let link = ['/inboxTramite'];
        this.router.navigate(link);
        console.log("Regresar bandeja tramite");
    }
    
    ngOnInit(): void {

        this.param = this.router.url.split('/');
        if (this.param[2].length>0)
            alert("Detalle Trámite: " + this.param[2]);
        else
            alert("Nuevo Trámite: " + this.param[2]);

        //this.getInfoTramite();

    }

}