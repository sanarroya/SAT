import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user' 

@Component({
    selector: 'usuario',
    templateUrl: './app/usuario/inbox.component.html',
    styleUrls: ['./app/usuario/inbox.component.css', './app/usuario/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxUsuarioComponent implements OnInit {

    public selectUsuario: User[];
    public username;

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

    public removeItem(item: any) {
        alert("eliminar: " + item.id);
        console.log("Remove: ", item.id);
    }

    public editItem(item: any) {
        alert("Editar" + item.cedula);
        let link = ['/editProfile', item.cedula];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    }

    public newItem() {
        alert("Nuevo Usuario");
        let link = ['/editProfile', 0];
        this.router.navigate(link);
        console.log("Nuevo Uusuario");
    }

    ngOnInit(): void {
        this.selectUsuario = [
            { nombre: 'Maria Antonia Ochoa Perez', cedula: 1234, email: 'mochoa@correo.com', tipo:'Funcionario', telefono: '', confirmPassword:'',password:'' },
            { nombre: 'Juan Carlos Marin Lopez', cedula: 2345, email: 'jlopez@correo.com', tipo: 'Funcionario', telefono: '', confirmPassword: '', password: ''},
            { nombre: 'Johana Patricia Rojas Pinto', cedula: 3456, email: 'jpinto@correo.com', tipo: 'Ciudadano', telefono: '', confirmPassword: '', password: ''},
            { nombre: 'Rosa Cecilia Sanchez Gil', cedula: 4567, email: 'rsanchez@correo.com', tipo: 'Ciudadano', telefono: '', confirmPassword: '', password: ''}
        ];

        this.username = "Administrador";
        //this.getAllUsuarios();

    }

    getAllUsuarios() {
        this.authService.getAllUsuarios()
            .subscribe(
            response => {
                this.selectUsuario = response;
            },
            error => {
                alert('hay un error');
                alert(error.text());
                console.log(error.text());
            }
            );
    }

}