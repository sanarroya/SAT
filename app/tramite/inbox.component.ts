import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN,MENU_FCN} from "../menu_mock";
import {tramites} from "../tramites";
import {DeleteTramite} from "../deleteProcedure";
import {CreateProcedureService} from '../create-procedure/create-procedure.service'

@Component({
    selector: 'tramite',
    templateUrl: './app/tramite/inbox.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/tramite/inbox.component.css', './app/tramite/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxTramiteComponent implements OnInit {

    public selectTramite: tramites[] = [];
    menus: menu[];
    admin = false

    constructor(private router: Router, private authService: AuthenticationService, private createProcedureService: CreateProcedureService, private toastr: ToastsManager) {
        if (localStorage.getItem("type_user") === '1') {
            this.menus = MENU_CDN;
        } else if (localStorage.getItem("type_user") === '2') {
            this.menus = MENU_FCN;
        } else {
            this.menus = MENU_ADM;
        }


        this.admin = localStorage.getItem("type_user") === '1' ? false : true;

    }

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

    public removeItem(item: tramites) {
        console.log("Remove: ", item.nombre);
        let tramitex = new DeleteTramite();
        tramitex.id = item.id;
        console.log(JSON.stringify(tramitex));
        this.authService.deleteProcedure(tramitex)
            .subscribe(response => {
                this.toastr.info("Tramite Eliminado", 'Alerta');
                this.getAllTramites();
            }, error => {
                this.toastr.error("Error Eliminando el tramite, por favor intente de nuevo", 'Alerta');
                console.log(error.toString());
            });

    }

    public editItem(item: tramites) {
        this.toastr.info("Editar: " + item.nombre, 'Alerta');
        localStorage.setItem("editcampoStoredId", item.id.toString());
        localStorage.setItem("fieldCamp", "false");
        let link = ['/procedure'];
        this.router.navigate(link);
        console.log("Edit: ", item.nombre);
    }

    public newItem() {
        this.toastr.info("Nuevo Trámite", 'Alerta');
        localStorage.setItem("editcampoStoredId", "0");
        localStorage.setItem("fieldCamp", "false");
        let link = ['/procedure'];
        this.router.navigate(link);
        console.log("Nuevo Trámite: ");
    }

    public onNewProcedure(item: tramites) {
        if (!this.admin) {
            this.createProcedureService.procedure = item
                    this.router.navigate(['/createProcedure'])
        }
    }

    public change() {
        this.admin = !this.admin
    }

    ngOnInit(): void {

        this.getAllTramites();

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

     getProcedure(id:string) {
        this.authService.getDetalleTramite(id).subscribe(
                response => {
                    
                },
                error => {
                    this.toastr.error('hay un error', 'Alerta');
                    this.toastr.error(error.text(), 'Alerta');
                    console.log(error.text());
                }
        )
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

}