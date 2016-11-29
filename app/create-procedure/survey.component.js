"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var FileSAT_1 = require("./FileSAT");
var file_service_1 = require("./file.service");
var create_procedure_service_1 = require("./create-procedure.service");
var Survey = (function () {
    function Survey(fileService, createProcedureService) {
        this.fileService = fileService;
        this.createProcedureService = createProcedureService;
        this.payload = null;
        // alert(this.createProcedureService.procedure.id)
    }
    Survey.prototype.ngOnInit = function () {
        this.form = this.model.toGroup();
        this.filesToUpload = new Array();
    };
    Survey.prototype.onSubmit = function () {
        this.payload = JSON.stringify(this.form.value);
        console.log(this.payload);
        var body = JSON.stringify({ idtramite: this.createProcedureService.procedure.id, idusuario: localStorage.getItem("cedula_user"), campos: this.payload });
        this.fileService.upload_file(this.filesToUpload, body);
    };
    //Metodo encargado de cuando se carga el archivo lo guarde en la varibale myfile
    Survey.prototype.fileChangeEvent = function (fileInput, algo) {
        algo.value = fileInput.target.files[0];
        var prueba;
        var bandera;
        bandera = true;
        prueba = new FileSAT_1.FileSAT();
        prueba.nombre = fileInput.target.files[0].name;
        prueba.idarchivo = algo.key;
        prueba.archivo = fileInput.target.files[0];
        for (var i = 0; i < this.filesToUpload.length; i++) {
            if (prueba.idarchivo == this.filesToUpload[i].idarchivo) {
                bandera = false;
            }
        }
        if (bandera) {
            this.filesToUpload.push(prueba);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Survey.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Survey.prototype, "tramite", void 0);
    Survey = __decorate([
        core_1.Component({
            selector: 'survey',
            templateUrl: './app/create-procedure/survey.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
            providers: [file_service_1.FileService]
        }), 
        __metadata('design:paramtypes', [file_service_1.FileService, create_procedure_service_1.CreateProcedureService])
    ], Survey);
    return Survey;
}());
exports.Survey = Survey;
//# sourceMappingURL=survey.component.js.map