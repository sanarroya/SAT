import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'
import { Tramite } from '../tramite'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN} from "../menu_mock";
import {campo} from "../campo";

@Component({
    selector: 'tramite',
    templateUrl: './app/tramite/inbox.component.html',
    styleUrls: ['./app/signin/signin.component.css','./app/tramite/inbox.component.css','./app/tramite/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxTramiteComponent implements OnInit {

    public selectTramite: Tramite[];  
    public username;
    menus: menu[];

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private toastr: ToastsManager
    ) { this.menus = localStorage.getItem("type_user") === 'Ciudadano' ? MENU_CDN : MENU_ADM;}
    
    private sortByWordLength = (a: any) => {
        return a.name.length;
    }
    
    public removeItem(item: any) {
        this.toastr.info("Eliminar: " + item.id, 'Alerta');
        console.log("Remove: ", item.id);
    }

    public editItem(item: any) {
        this.toastr.info("Editar: " + item.id, 'Alerta');
        let campo:campo[]=[];
        localStorage.setItem("campos", JSON.stringify(campo));
        localStorage.setItem("tramite", "");
        localStorage.setItem("descripcion", "");
        localStorage.setItem("edit", 'false');
        localStorage.setItem("campoid", "");
        localStorage.setItem("type", "");
        localStorage.setItem("campo", "");
        let link = ['/procedure'];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    }

    public newItem() {
        this.toastr.info("Nuevo Trámite", 'Alerta');
        let campo:campo[]=[];
        localStorage.setItem("campos", JSON.stringify(campo));
        localStorage.setItem("tramite", "");
        localStorage.setItem("descripcion", "");
        localStorage.setItem("edit", 'false');
        localStorage.setItem("campoid", "");
        localStorage.setItem("type", "");
        localStorage.setItem("campo", "");
        let link = ['/procedure'];
        this.router.navigate(link);
        console.log("Nuevo Trámite: ");
    }
    
    ngOnInit(): void {
        //alert("Bandeja Trámites");
        this.selectTramite = [
            { descripcion: 'descripicion del tramite1', nombre: 'tramite1', id: 1 },
            { descripcion: 'descripicion del tramite2', nombre: 'tramite2', id: 2 },
            { descripcion: 'descripicion del tramite3', nombre: 'tramite3', id: 3 },
            { descripcion: 'descripicion del tramite4', nombre: 'tramite4', id: 4 }
        ];

       this.username= "Administrador";
        //this.getAllTramites();

    }

    getAllTramites() {
        this.authService.getAllTramites()
            .subscribe(
            response => {
                this.selectTramite = response;
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