import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthenticationService } from '../services/authentication.service'
import {menu} from "../menu";
import {MENU_ADM, MENU_CDN, MENU_FCN} from "../menu_mock"
import {ToastsManager } from 'ng2-toastr/ng2-toastr'
import {Survey} from '../create-procedure/survey.component'
import {FieldModel} from '../create-procedure/field-model'
import {TextBoxField} from '../create-procedure/textbox-field'
import {FileField} from '../create-procedure/file-field'
import {tramites} from "../tramites"
import {campo} from "../campo";
import {CreateProcedureService} from '../create-procedure/create-procedure.service'

@Component({
    selector: 'create-procedure',
    templateUrl: './app/create-procedure/create-procedure.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
})

export class CreateProcedureComponent implements OnInit {

    menus: menu[]
    tramiteSelected = new tramites()
    camposSelected: campo[] = []
    num: number = 0


    fieldModel = new FieldModel()
    constructor(private router: Router, private authService: AuthenticationService, private createProcedureService: CreateProcedureService, private toastr: ToastsManager) {
        if (localStorage.getItem("type_user") === '1') {
            this.menus = MENU_CDN
        } else if (localStorage.getItem("type_user") === '2') {
            this.menus = MENU_FCN
        } else {
            this.menus = MENU_ADM
        }

    }

    ngOnInit(): void {
        this.drawFields()
        // this.getProcedure(this.createProcedureService.procedure.id.toString())
    }

    onSelect(hero: menu): void {
        this.router.navigate([hero.id])
    }

    private drawFields(): void {
        console.log(this.createProcedureService.procedure.campos)
        this.createProcedureService.procedure.campos.forEach((campo) =>{
            if(campo.tipo === "texto") {
                let field = new TextBoxField()
                field.key = campo.idcampo
                field.text = campo.nombre
                field.required = true
                field.order = this.num
                this.fieldModel.fields.push(field)
            } else {
                let field = new FileField()
                field.key = campo.idcampo
                field.text = campo.nombre
                field.required = true
                field.order = this.num
                this.fieldModel.fields.push(field)
            }
            
            this.num++
        })
    }

    onBack(): void {
        this.router.navigate(["/inboxTramite"]);
    }
}