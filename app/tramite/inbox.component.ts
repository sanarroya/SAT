import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { User } from '../user'
import { Tramite } from '../tramite' 

@Component({
    selector: 'tramite',
    templateUrl: './app/tramite/inbox.component.html',
    styleUrls: ['./app/tramite/inbox.component.css'],
    providers: [AuthenticationService]
})


export class InboxTramiteComponent implements OnInit {

   public selectTramite: any[];    

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }
    
    getTramite(): void {
        this.authService.getTramites().subscribe(response => {
            localStorage.setItem('cedula_user', <string>response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            this.selectTramite = response;
        }, error => {
            let jsonObject = JSON.parse(error.text());
            alert(jsonObject.message);
            console.log(error.text());
            ;
            });
    }

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
        let link = ['/newTramite'];
        this.router.navigate(link);
        console.log("Nuevo Trámite: ");
    }
    
    ngOnInit(): void {
        alert("Bandeja Trámites");
        //this.getTramite();
        this.selectTramite = [
            { descripcion: 'descripicion del tramite1', nombre: 'tramite1', id: 1 },
            { descripcion: 'descripicion del tramite2', nombre: 'tramite2', id: 2 },
            { descripcion: 'descripicion del tramite3', nombre: 'tramite3', id: 3 },
            { descripcion: 'descripicion del tramite4', nombre: 'tramite4', id: 4 }
        ];       

    }

}