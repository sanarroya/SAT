import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { menu } from "../menu";
import { MENU_ADM, MENU_CDN } from "../menu_mock";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Survey } from '../create-procedure/survey.component'
import { FieldModel } from '../create-procedure/field-model'
import { TextBoxField } from '../create-procedure/textbox-field'
import { FileField } from '../create-procedure/file-field'
import {tramites} from "../tramites"
import {campo} from "../campo";


@Component({
    selector: 'create-procedure',
    templateUrl: './app/create-procedure/create-procedure.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
})

export class CreateProcedureComponent implements OnInit {

    menus: menu[];
    tramiteSelected = new tramites();
    camposSelected: campo[] = [];
    num: number = 0;


    fieldModel = new FieldModel()
    constructor(private router: Router, private authService: AuthenticationService) {
        this.menus = localStorage.getItem("type_user") === '1' ? MENU_CDN : MENU_ADM
    }

    ngOnInit(): void {
        this.drawFields()
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id]);
    }

    private drawFields(): void {

        let tramite: tramites = JSON.parse(localStorage.getItem("crearSolicitud"))
        
        tramite.campos.forEach((campo) =>{
            if(campo.tipo === "texto") {
                let field = new TextBoxField()
                field.key = campo.nombre
                field.text = campo.nombre
                field.required = true
                field.order = this.num
                this.fieldModel.fields.push(field)
            } else {
                let field = new FileField()
                field.key = campo.nombre
                field.text = campo.nombre
                field.required = true
                field.order = this.num
                this.fieldModel.fields.push(field)
            }
            
            this.num++
        })

        //field = new TextBoxField()
        //field.key = 'firstName'
        //field.text = 'First name'
        //field.required = true
        //field.order = 1
       // this.fieldModel.fields.push(field)

       // field = new FileField()
       // field.key = 'extractoBancario'
       // field.text = 'Extracto Bancario'
       // field.required = true
       // field.order = 2
       // this.fieldModel.fields.push(field)
    }
}