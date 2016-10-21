import {Component, OnInit, Input} from '@angular/core'
import {Router} from '@angular/router'
import {campo} from "../campo";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'field-detail',
    templateUrl: './app/field-detail/field-detail.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/field-detail/field-detail.component.css'],
    providers: []

})

export class FieldDetailComponent implements OnInit {

    campoSelected=new campo();
    type: string;
    placeholder: string;
    num: string;
    edit: string;

    options = [
        {
            value: 'texto',
            label: 'Texto'
        },
        {
            value: 'documento',
            label: 'Documento'
        }
    ];

    constructor(private router: Router, private toastr: ToastsManager) {

        console.log(localStorage.getItem("campoid"));
        console.log(localStorage.getItem("campo"));
        console.log(localStorage.getItem("type"));
        this.placeholder = "Selecciona tipo de campo";
        this.type = localStorage.getItem("type");
        this.num = localStorage.getItem("campoid");
        this.edit = localStorage.getItem("edit");
        
    }


    onBack(): void {
        this.router.navigate(["/procedure"]);
    }

    getCampo():void{
        let campo1=new campo();
        campo1.nombre=localStorage.getItem("campo");
        campo1.tipo=localStorage.getItem("type");
        campo1.id=localStorage.getItem("campoid");
        this.campoSelected=campo1;
    }


    submitTramite(nombre): void {


        if ((nombre === null || nombre === "") || (this.type === null || this.type === "")) {

            this.toastr.error('Todos los campos son obligatorios', 'Alerta');

        } else {

            if (this.edit === "true") {
                console.log(this.num);
                localStorage.setItem("campoid", this.num);
            } else {
                let n: number = +this.num;
                n = n + 1;
                localStorage.setItem("campoid", n.toString());

            }
            console.log(nombre);
            console.log(this.type);
            localStorage.setItem("campo", nombre);
            localStorage.setItem("type", this.type);
            localStorage.setItem("operationDetail", "true");
            this.router.navigate(['/procedure']);
        }

    }

    onSelected(item) {
        this.type = item.value.toString();
        console.log('Selected: ' + item.value + ', ' + item.label);
        this.placeholder = "Selecciona tipo de campo";
    }


    onSelectOpened() {
        this.placeholder = "Selecciona tipo campo";

    }


    ngOnInit(): void {
      this.getCampo();
    }
}
