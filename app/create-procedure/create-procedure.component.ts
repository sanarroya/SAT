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

@Component({
    selector: 'create-procedure',
    templateUrl: './app/create-procedure/create-procedure.component.html',
    styles: ['']
})

export class CreateProcedureComponent implements OnInit {

    menus: menu[];
    fieldModel = new FieldModel()
    constructor(private router: Router, private authService: AuthenticationService) {
        this.menus = localStorage.getItem("type_user") === 'Ciudadano' ? MENU_CDN : MENU_ADM
    }

    ngOnInit(): void {
        this.drawFields()
    }

    private drawFields(): void {

        let field = new TextBoxField()
        field.key = 'lastName'
        field.text = 'Last name'
        field.required = true
        field.order = 0
        this.fieldModel.fields.push(field)

        field = new TextBoxField()
        field.key = 'firstName'
        field.text = 'First name'
        field.required = true
        field.order = 1
        this.fieldModel.fields.push(field)

        field = new FileField()
        field.key = 'extractoBancario'
        field.text = 'Extracto Bancario'
        field.required = true
        field.order = 2
        this.fieldModel.fields.push(field)

        //var element = document.createElement("input");
        //Assign different attributes to the element.
        //element.setAttribute("type", "file");
        //element.setAttribute("name", "htmlelent");
        //element.setAttribute("style","color: white; background-color: #05AFA8;");
        //document.body.appendChild(element);
    }
}