import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN, CAMPO_MOCK} from "../menu_mock";
import {tramites} from "../tramite";
import {campo} from "../campo";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'procedure',
    templateUrl: './app/procedure/procedure.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/procedure/procedure.component.css'],
    providers: [
        AuthenticationService
    ]
})

export class ProcedureComponent implements OnInit {

    menus: menu[];
    camposSelected: campo[] = [];
    tramiteSelected=new tramites();


    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
        this.menus = localStorage.getItem("type_user") == 'Ciudadano' ? MENU_CDN : MENU_ADM;

        this.camposSelected = JSON.parse(localStorage.getItem("campos")) === null ? [] : JSON.parse(localStorage.getItem("campos"));

        this.tramiteSelected.nombre=localStorage.getItem("tramite");
        this.tramiteSelected.descripcion=localStorage.getItem("descripcion");

        if (localStorage.getItem("operationDetail") === "true") {

            localStorage.setItem("operationDetail", "false");

            if (localStorage.getItem("edit") === "true") {
                localStorage.setItem("edit","false");
                let index: number = +localStorage.getItem("campoid");
                if (index > -1) {
                    index=index-1;
                    this.camposSelected[index].nombre = localStorage.getItem("campo");
                    this.camposSelected[index].tipo = localStorage.getItem("type");
                }
            } else {
                let camp = new campo();
                camp.id = localStorage.getItem("campoid");
                camp.nombre = localStorage.getItem("campo");
                camp.tipo = localStorage.getItem("type");
                this.camposSelected.push(camp);

            }

            localStorage.setItem("campos", JSON.stringify(this.camposSelected));
        }

    }

    createProcedure(nomTramite,desTramite): void {
        let lenghtC: number = 0;
        if(nomTramite==null || nomTramite==="" || desTramite===null || desTramite==="" || this.camposSelected===null ){
            this.toastr.error('Un Tramite todos los campos son obligatorios', 'Alerta');
        }else{

            let lenghtC=+this.camposSelected.length;

            if(lenghtC>0){

                let tramitex=new tramites();
                tramitex.nombre=nomTramite;
                tramitex.descripcion=desTramite;
                tramitex.campos=this.camposSelected;


                this.authService.createProcedure(tramites)
                    .subscribe(response => {
                        this.toastr.info("Tramite Creado", 'Alerta');
                        this.camposSelected.splice(0,this.camposSelected.length);
                        localStorage.setItem("campos", JSON.stringify(this.camposSelected));
                        localStorage.setItem("tramite", "");
                        localStorage.setItem("descripcion", "");
                        localStorage.setItem("edit", 'false');
                        localStorage.setItem("campoid", "");
                        localStorage.setItem("type", "");
                        localStorage.setItem("campo", "");
                        this.router.navigate(['/editProfile']);
                    }, error => {
                        let jsonObject = JSON.parse(error.text());
                        this.toastr.error("Error creando el tramite, por favor intente de nuevo", 'Alerta');
                        console.log(error.text());
                    });

            }else{
                this.toastr.error('Un Tramite debe tener al menos un campo', 'Alerta');
            }

        }

    }



    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

    onSelectEditCampo(campo: campo): void {
        localStorage.setItem("tramite", this.tramiteSelected.nombre);
        localStorage.setItem("descripcion", this.tramiteSelected.descripcion);
        localStorage.setItem("edit", 'true');
        localStorage.setItem("campoid", campo.id);
        localStorage.setItem("type", campo.tipo);
        localStorage.setItem("campo", campo.nombre);
        localStorage.setItem("campos", JSON.stringify(this.camposSelected));
        this.router.navigate(['/fieldDetail']);
    }

    onSelectRemoveCampo(campo: campo): void {
        let index = this.camposSelected.indexOf(campo, 0);
        if (index > -1) {
            this.camposSelected.splice(index, 1);
        }
        localStorage.setItem("campos", JSON.stringify(this.camposSelected));
    }

    onFielDetail(): void {
        let le: number = 0;
        if (this.camposSelected != null) {
            le = this.camposSelected.length;
            localStorage.setItem("campos", JSON.stringify(this.camposSelected));
        }
        localStorage.setItem("campoid", le.toString());
        localStorage.setItem("type", "");
        localStorage.setItem("campo", "");
        localStorage.setItem("edit", 'false');
        localStorage.setItem("tramite", this.tramiteSelected.nombre);
        localStorage.setItem("descripcion", this.tramiteSelected.descripcion);

        this.router.navigate(['/fieldDetail']);
    }

    ngOnInit(): void {

    }
}
