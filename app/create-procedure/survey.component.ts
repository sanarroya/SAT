import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'

import { FieldModel } from '../create-procedure/field-model'
import { TextBoxField } from '../create-procedure/textbox-field'
import {FileSAT} from "./FileSAT";
import {FileService} from "./file.service";
import {CreateProcedureService} from "./create-procedure.service";

@Component({
    selector: 'survey',
    templateUrl: './app/create-procedure/survey.component.html',
    styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
    providers: [FileService]
})

export class Survey implements OnInit {
    
    @Input() model: any
    @Input() tramite: any
    form: FormGroup
    payload = null

    filesToUpload: Array<FileSAT>;


    constructor(private fileService: FileService, private createProcedureService: CreateProcedureService) {
        // alert(this.createProcedureService.procedure.id)
    }

    ngOnInit() {
        this.form = this.model.toGroup()
        this.filesToUpload = new Array();
    }

    onSubmit() {
        this.payload = JSON.stringify(this.form.value)
        console.log(this.payload)
        let body = JSON.stringify({idtramite:this.createProcedureService.procedure.id, idusuario: localStorage.getItem("cedula_user"), campos: this.payload});
        this.fileService.upload_file(this.filesToUpload, body);
    }

    //Metodo encargado de cuando se carga el archivo lo guarde en la varibale myfile
    fileChangeEvent(fileInput: any, algo: any){
        algo.value = fileInput.target.files[0];
        let prueba: FileSAT;
        let bandera: boolean;
        bandera = true;
        prueba = new FileSAT();
        prueba.nombre = fileInput.target.files[0].name;
        prueba.idarchivo = algo.key;
        prueba.archivo = fileInput.target.files[0];
        for(var i = 0; i < this.filesToUpload.length; i++){
            if(prueba.idarchivo == this.filesToUpload[i].idarchivo){
                bandera = false;
            }

        }
        if(bandera) {
            this.filesToUpload.push(prueba);
        }
    }
}