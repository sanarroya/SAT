import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN} from "../menu_mock";
import {campo} from "../campo";
import {tramites} from "../tramites";

@Component({
    selector: 'tramite',
    templateUrl: './app/tramite/inboxTramite.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/tramite/inboxTramite.component.css', './app/tramite/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxTramiteComponent implements OnInit {

    public selectTramite: tramites[] = [];
    public username;
    menus: Menu[];

    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
        this.menus = localStorage.getItem("type_user") === '1' ? MENU_CDN : MENU_ADM;
        this.selectTramite = JSON.parse(localStorage.getItem("tramiteInbox")) === null ? [] : JSON.parse(localStorage.getItem("tramiteInbox"));
        let tramite: tramites = JSON.parse(localStorage.getItem("tramiteStored"));
        let edit: string = localStorage.getItem("editcampoStoredId");

        if (edit === "true") {

            localStorage.setItem("editcampoStoredId", "false");
            let index: number = +localStorage.getItem("campoStoredId");
            if (index > -1) {
                index =  index - 1;
                this.selectTramite[index].nombre = tramite.nombre;
                this.selectTramite[index].descripcion = tramite.descripcion;
                this.selectTramite[index].campos = tramite.campos;
                this.selectTramite[index].id = tramite.id;
            }
        } else {
            if (tramite != null) {
                console.log("stored " + tramite.nombre);
                this.selectTramite.push(tramite);
                localStorage.setItem("tramiteStored", null);
            }
        }

    }

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

    public removeItem(item: tramites) {
        this.toastr.info("Eliminado: " + item.nombre, 'Alerta');
        console.log("Remove: ", item.nombre);
        let index = this.selectTramite.indexOf(item, 0);
        if (index > -1) {
            this.selectTramite.splice(index, 1);
        }

        localStorage.setItem("tramiteInbox", JSON.stringify(this.selectTramite));
    }

    public editItem(item: tramites) {
        this.toastr.info("Editar: " + item.nombre, 'Alerta');
        localStorage.setItem("tramiteInbox", JSON.stringify(this.selectTramite));
        localStorage.setItem("tramite", item.nombre);
        localStorage.setItem("descripcion", item.descripcion);
        localStorage.setItem("campos", JSON.stringify(item.campos));
        localStorage.setItem("campoStoredId", item.id);
        localStorage.setItem("editcampoStoredId", "true");

        let link = ['/procedure'];
        this.router.navigate(link);
        console.log("Edit: ", item.nombre);
    }

    public newItem() {
        this.toastr.info("Nuevo Trámite", 'Alerta');
        let campo: campo[] = [];
        localStorage.setItem("campos", JSON.stringify(campo));
        localStorage.setItem("tramite", "");
        localStorage.setItem("descripcion", "");
        localStorage.setItem("edit", 'false');
        localStorage.setItem("campoid", "");
        localStorage.setItem("type", "");
        localStorage.setItem("campo", "");
        localStorage.setItem("editcampoStoredId", "false");
        localStorage.setItem("campoStoredId", this.selectTramite.length.toString());
        localStorage.setItem("tramiteInbox", JSON.stringify(this.selectTramite));
        let link = ['/procedure'];
        this.router.navigate(link);
        console.log("Nuevo Trámite: ");
    }

    ngOnInit(): void {


    }

    getAllTramites() {
        /* this.authService.getAllTramites()
         .subscribe(
         response => {
         this.selectTramite = response;
         },
         error => {
         this.toastr.error('hay un error', 'Alerta');
         this.toastr.error(error.text(), 'Alerta');
         console.log(error.text());
         }
         );*/
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

}