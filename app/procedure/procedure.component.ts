import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN, CAMPO_MOCK} from "../menu_mock";
import {tramites} from "../tramites";
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
    tramiteSelected = new tramites();
    num: number = 1;


    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
        this.menus = localStorage.getItem("type_user") == '1' ? MENU_CDN : MENU_ADM;

        let index: number = localStorage.getItem("editcampoStoredId");
        if (index > 0 && localStorage.getItem("fieldCamp") === "false") {

            this.getTramite(index.toString());
        } else if (localStorage.getItem("fieldCamp") === "true") {

            this.camposSelected = JSON.parse(localStorage.getItem("campos")) === null ? [] : JSON.parse(localStorage.getItem("campos"));
            this.tramiteSelected.nombre = localStorage.getItem("tramite");
            this.tramiteSelected.descripcion = localStorage.getItem("descripcion");

            if (localStorage.getItem("operationDetail") === "true") {

                localStorage.setItem("operationDetail", "false");

                if (localStorage.getItem("edit") === "true") {
                    localStorage.setItem("edit", "false");
                    let index : number= +localStorage.getItem("campoid");
                    console.log("id campo1 "+index);
                    if (index > -1) {

                        console.log("id campo 2 "+index);

                        this.camposSelected.filter(function (v) {
                            console.log("id campo 3 "+v.idcampo);
                            return v.idcampo == index;

                        }).map(x=> {
                            x.nombre = localStorage.getItem("campo");
                            x.tipo = localStorage.getItem("type");
                            console.log("id campo 3 "+x.nombre);
                        });


                       /* index = index - 1;
                        this.camposSelected[index].nombre = localStorage.getItem("campo");
                        this.camposSelected[index].tipo = localStorage.getItem("type");*/
                    }
                } else {
                    let camp = new campo();
                    camp.idcampo = localStorage.getItem("campoid");
                    camp.nombre = localStorage.getItem("campo");
                    camp.tipo = localStorage.getItem("type");
                    this.camposSelected.push(camp);

                }

                localStorage.setItem("campos", JSON.stringify(this.camposSelected));
            }
        }

    }

    createProcedure(nomTramite, desTramite): void {
        let lenghtC: number = 0;
        if (nomTramite == null || nomTramite === "" || desTramite === null || desTramite === "" || this.camposSelected === null) {
            this.toastr.error('Un Tramite todos los campos son obligatorios', 'Alerta');
        } else {

            let lenghtC = +this.camposSelected.length;

            if (lenghtC > 0) {

                let tramitex = new tramites();
                tramitex.id = localStorage.getItem("editcampoStoredId");
                tramitex.nombre = nomTramite;
                tramitex.descripcion = desTramite;
                tramitex.campos = this.camposSelected;


                console.log(JSON.stringify(tramitex));

                let index: number = localStorage.getItem("editcampoStoredId");
                if (index > 0) {

                    this.authService.updateProcedure(tramitex)
                        .subscribe(response => {
                            this.toastr.info("Tramite Actualizado", 'Alerta');
                            this.router.navigate(['/inboxTramite']);
                        }, error => {
                            this.toastr.error("Error Actualizando el tramite, por favor intente de nuevo", 'Alerta');
                            console.log(error.toString());
                        });


                } else {

                    this.authService.createProcedure(tramitex)
                        .subscribe(response => {
                            this.toastr.info("Tramite Creado", 'Alerta');
                            this.router.navigate(['/inboxTramite']);
                        }, error => {
                            this.toastr.error("Error creando el tramite, por favor intente de nuevo", 'Alerta');
                            console.log(error.toString());
                        });

                }


            } else {
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
        localStorage.setItem("campoid", campo.idcampo+"");
        localStorage.setItem("type", campo.tipo);
        localStorage.setItem("campo", campo.nombre);
        localStorage.setItem("campos", JSON.stringify(this.camposSelected));
        this.router.navigate(['/fieldDetail']);
    }

    onBack(): void {
        this.router.navigate(["/inboxTramite"]);
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



    getTramite(id:string) {

        this.authService.getDetalleTramite(id)
            .subscribe(
                response => {
                    this.tramiteSelected  = response;
                    this.camposSelected=this.tramiteSelected.campos;
                },
                error => {
                    this.toastr.error('hay un error', 'Alerta');
                    this.toastr.error(error.text(), 'Alerta');
                    console.log(error.text());
                }
            );
    }



}
