import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'
import { Solicitud } from '../solicitud'

@Component({
    selector: 'tramite',
    templateUrl: './app/solicitud/inbox.component.html',
    styleUrls: ['./app/solicitud/inbox.component.css', './app/solicitud/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxSolicitudComponent implements OnInit {

    public selectSolicitud: Solicitud[];
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
        alert("Editar" + item.id);
        let link = ['/editSolicitud', item.id];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    }

    public newItem() {
        alert("Nueva Solicitud");
        let link = ['/editSolicitud', 0];
        this.router.navigate(link);
        console.log("Nueva Solicitud");
    }

    ngOnInit(): void {
        //alert("Bandeja Solicitud");
        this.selectSolicitud = [
            { descripcion: 'descripicion de solicitud 1', nombre: 'solicitud 1', id: 1 },
            { descripcion: 'descripicion de solicitud 2', nombre: 'solicitud 2', id: 2 },
            { descripcion: 'descripicion de solicitud 3', nombre: 'solicitud 3', id: 3 },
            { descripcion: 'descripicion de solicitud 4', nombre: 'solicitud 4', id: 4 }
        ];

        this.username = "Administrador";
        //this.getAllSolicitudes();

    }

    getAllSolicitudes() {
        this.authService.getAllSolicitudes()
            .subscribe(
            response => {
                this.selectSolicitud = response;
            },
            error => {
                alert('hay un error');
                alert(error.text());
                console.log(error.text());
            }
            );
    }

}