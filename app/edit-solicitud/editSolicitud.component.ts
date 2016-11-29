import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN, MENU_FCN} from "../menu_mock";
import {User} from '../user'
import {Solicitud} from '../solicitud'
import {Item} from "../ObjectItem";

@Component({
    selector: 'edit-solicitud',
    templateUrl: './app/edit-solicitud/editSolicitud.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-solicitud/editSolicitud.component.css'],
    providers: [AuthenticationService]
})


export class EditSolicitud implements OnInit {

    @Input() idSolicitud: any;


    estado: string;
    funcionario: string;
    placeholder: string;
    placeholder1: string;
    private employees: User[];

    private options : any[];


    public request: Solicitud;

    menus: menu[];

    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
        if (localStorage.getItem("type_user") === '1') {
            this.menus = MENU_CDN;
        } else if (localStorage.getItem("type_user") === '2') {
            this.menus = MENU_FCN;
        } else {
            this.menus = MENU_ADM;
        }

    }

    getRequest(): void {

    }


    onBack(): void {
        this.router.navigate(['/inboxSolicitud']);
    }

    ngOnInit(): void {


        if (localStorage.getItem("type_user") === '0' || (localStorage.getItem("type_user") != '1' && localStorage.getItem("type_user") != '2')) {
            this.getAllEmployees();
            this.getStates();
        }


        //this.param = this.router.url.split('/');
        /*if (this.param[2].length>0)
         alert("Detalle Trámite: " + this.param[2]);
         else
         alert("Nuevo Trámite: " + this.param[2]);*/

        //this.getInfoTramite();

    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

    onSelectOpened() {
        this.placeholder = "Selecciona Estado";

    }

    onSelected(item) {
        this.estado = item.value.toString();
        console.log('Selected: ' + item.value + ', ' + item.label);
        this.placeholder = "Selecciona Estado";
    }

    onSelectOpened1() {
        this.placeholder1 = "Selecciona Funcionario";

    }

    onSelected1(item) {
        this.funcionario = item.value.toString();
        console.log('Selected: ' + item.value + ', ' + item.label);
        this.placeholder1 = "Selecciona Estado";
    }

    getAllEmployees() {


        this.authService.getAllEmployees()
            .subscribe(
                response => {
                    this.employees = response;
                },
                error => {
                    console.log(error)
                }
            )
    }


    getStates() {

        this.options = [
            {
                value: '0',
                label: 'Pendiente'
            },
            {
                value: '1',
                label: 'Progreso'
            },
            {
                value: '2',
                label: 'Finalizado'
            },
            {
                value: '3',
                label: 'Rechazado'
            }
        ];
    }


}