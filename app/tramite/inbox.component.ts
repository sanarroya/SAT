import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'
import { Tramite } from '../tramite' 

@Component({
    selector: 'tramite',
    templateUrl: './app/tramite/inbox.component.html',
    styleUrls: ['./app/tramite/inbox.component.css','./app/tramite/button-floating.css'],
    providers: [AuthenticationService]
})


export class InboxTramiteComponent implements OnInit {

    public selectTramite: Tramite[];  
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
        let link = ['/editTramite', item.id];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    }

    public newItem() {
        alert("Nuevo Trámite"); 
        let link = ['/editTramite', 0];
        this.router.navigate(link);
        console.log("Nuevo Trámite: ");
    }
    
    ngOnInit(): void {
        //alert("Bandeja Trámites");
        this.selectTramite = [
            { descripcion: 'descripicion del tramite1', nombre: 'tramite1', id: 1 },
            { descripcion: 'descripicion del tramite2', nombre: 'tramite2', id: 2 },
            { descripcion: 'descripicion del tramite3', nombre: 'tramite3', id: 3 },
            { descripcion: 'descripicion del tramite4', nombre: 'tramite4', id: 4 }
        ];

       this.username= "Administrador";
        //this.getAllTramites();

    }

    getAllTramites() {
        this.authService.getAllTramites()
            .subscribe(
            response => {
                this.selectTramite = response;
            },
            error => {
                alert('hay un error');
                alert(error.text());
                console.log(error.text());
            } 
            );
    }
    

}