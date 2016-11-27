import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN} from "../menu_mock";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {EditEmployeeService} from '../edit-employee-profile/edit-employee-service'

@Component({
    selector: 'usuario',
    templateUrl: './app/usuario/inbox.component.html',
    styleUrls: ['./app/signin/signin.component.css','./app/usuario/inbox.component.css', './app/usuario/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxUsuarioComponent implements OnInit {

   // selectUsuario: [User]
    private employees: User[]
    username
    menus: menu[]

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private editEmployeeService: EditEmployeeService,
        private toastr: ToastsManager) { 
            this.menus = localStorage.getItem("type_user") === '1' ? MENU_CDN : MENU_ADM;
    }

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

    deleteEmployee(item: any) {
        this.toastr.info("Eliminar: " + item.id, 'Alerta');
        console.log("Remove: ", item.id);
    }

    editEmployee(item: any) {
        this.editEmployeeService.employee = <User>item
        this.toastr.info("Editar: " + item.id, 'Alerta');
        let link = ['/editEmployee', item.cedula];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    }

    addEmployee() {
        this.router.navigate(['/signUpEmployee']);
    }

    ngOnInit(): void {
        //noinspection TypeScriptValidateTypes
        this.authService.getAllEmployees()
            .subscribe(
                response => {
                    this.employees = response
                    console.log(this.employees)
                },
                error => {
                    console.log(error)
                }
            )
        

    }

    getAllUsuarios() {
        this.authService.getAllUsuarios()
            .subscribe(
            response => {
                this.selectUsuario = response;
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