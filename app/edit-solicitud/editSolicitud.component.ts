import { Component, OnInit, Input } from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService} from '../services/authentication.service'
import {ToastsManager} from 'ng2-toastr/ng2-toastr'
import {menu} from '../menu'
import {MENU_ADM, MENU_CDN, MENU_FCN} from '../menu_mock'
import {User} from '../user'
import {Solicitud} from '../solicitud'
import {Item} from '../ObjectItem'
import {camposolicitud} from '../camposSolicitud'
import {udpateState} from '../requestState'
import {udpateFunc} from '../requestFunc'
import {State} from '../edit-solicitud/state'

@Component({
    selector: 'edit-solicitud',
    templateUrl: './app/edit-solicitud/editSolicitud.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-solicitud/editSolicitud.component.css'],
    providers: [AuthenticationService]
})



export class EditSolicitud implements OnInit {

    @Input() idSolicitud: any;

    solicitud: Solicitud
    estado: string
    funcionario: string
    placeholder: string
    placeholder1: string
    menus: menu[];
    private employees: User[]
    private fields: camposolicitud[]
    private options: State[] = [
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
                                ]

    constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastsManager) {
        this.solicitud = JSON.parse(localStorage.getItem("solicitud2"));
        this.fields = this.solicitud.campos
        this.funcionario = this.solicitud.documentofuncionario;
        this.estado = this.findStateNameWithValue(this.solicitud.estado)
        if (localStorage.getItem("type_user") === '1') {
            this.menus = MENU_CDN;
        } else if (localStorage.getItem("type_user") === '2') {
            this.menus = MENU_FCN;
        } else {
            this.menus = MENU_ADM;
        }
    }

    onBack(): void {
        this.router.navigate(['/inboxSolicitud']);
    }

    ngOnInit(): void {
        if (localStorage.getItem("type_user") === '0' || (localStorage.getItem("type_user") != '1' && localStorage.getItem("type_user") != '2')) {
            this.getAllEmployees();
        } 
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

    onUpdateState(): void {
        console.log(this.estado);
        let tramitex = new udpateState();
        tramitex.id = this.solicitud.id.toString();
        tramitex.state = this.estado;
        this.authService.updateState(tramitex)
            .subscribe(response => {
                this.toastr.info("Estado Actualizado", 'Alerta');
            }, error => {
                this.toastr.error("Error, por favor intente de nuevo", 'Alerta');
            }
        )
    }

    onUpdateFunc(): void {
        let tramitex = new udpateFunc();
        tramitex.id = this.solicitud.id.toString();
        tramitex.idfuncionario = this.funcionario;
        this.authService.updateFunction(tramitex)
            .subscribe(response => {
                this.toastr.info("Funcionario Actualizado", 'Alerta');
            }, error => {
                this.toastr.error("Error, por favor intente de nuevo", 'Alerta');
            }
        )
    }

    getAllEmployees() {
        this.authService.getAllEmployees().subscribe(
            response => {
                this.employees = response;
            },
            error => {
                this.toastr.error("Error, por favor intente de nuevo", 'Alerta');
            }
        )
    }

    private findStateNameWithValue(value: string): string {
        for(var i = 0; i < this.options.length; i++) {
            let state = this.options[i] as State
            if(state.value == value) {
                return state.label
            }
        }
    }
}
