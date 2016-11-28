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

    deleteEmployee(employee: User) {
        this.authService.deleteEmployee(employee)
            .subscribe(
                response => {
                    this.toastr.info('Empleado eliminado', 'Alerta')
                    let index = this.employees.indexOf(employee)
                    this.employees.splice(index, 1)
                }, error => {
                    this.toastr.info('Empleado no eliminado', 'Alerta')
                }
            )
    }

    editEmployee(employee: User) {
        this.editEmployeeService.employee = employee
        this.router.navigate(['/editEmployee', employee.cedula]);
    }

    addEmployee() {
        this.router.navigate(['/signUpEmployee']);
    }

    ngOnInit(): void {
        this.getAllEmployees()
    }

    getAllEmployees() {
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

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

}