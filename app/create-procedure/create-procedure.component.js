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
var router_1 = require('@angular/router');
var authentication_service_1 = require('../services/authentication.service');
var menu_mock_1 = require("../menu_mock");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var field_model_1 = require('../create-procedure/field-model');
var textbox_field_1 = require('../create-procedure/textbox-field');
var file_field_1 = require('../create-procedure/file-field');
var tramites_1 = require("../tramites");
var create_procedure_service_1 = require('../create-procedure/create-procedure.service');
var CreateProcedureComponent = (function () {
    function CreateProcedureComponent(router, authService, createProcedureService, toastr) {
        this.router = router;
        this.authService = authService;
        this.createProcedureService = createProcedureService;
        this.toastr = toastr;
        this.tramiteSelected = new tramites_1.tramites();
        this.camposSelected = [];
        this.num = 0;
        this.fieldModel = new field_model_1.FieldModel();
        if (localStorage.getItem("type_user") === '1') {
            this.menus = menu_mock_1.MENU_CDN;
        }
        else if (localStorage.getItem("type_user") === '2') {
            this.menus = menu_mock_1.MENU_FCN;
        }
        else {
            this.menus = menu_mock_1.MENU_ADM;
        }
    }
    CreateProcedureComponent.prototype.ngOnInit = function () {
        this.drawFields();
        // this.getProcedure(this.createProcedureService.procedure.id.toString())
    };
    CreateProcedureComponent.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    CreateProcedureComponent.prototype.drawFields = function () {
        var _this = this;
        console.log(this.createProcedureService.procedure.campos);
        this.createProcedureService.procedure.campos.forEach(function (campo) {
            if (campo.tipo === "texto") {
                var field = new textbox_field_1.TextBoxField();
                field.key = campo.idcampo;
                field.text = campo.nombre;
                field.required = true;
                field.order = _this.num;
                _this.fieldModel.fields.push(field);
            }
            else {
                var field = new file_field_1.FileField();
                field.key = campo.nombre;
                field.text = campo.nombre;
                field.required = true;
                field.order = _this.num;
                _this.fieldModel.fields.push(field);
            }
            _this.num++;
        });
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
    };
    CreateProcedureComponent = __decorate([
        core_1.Component({
            selector: 'create-procedure',
            templateUrl: './app/create-procedure/create-procedure.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, create_procedure_service_1.CreateProcedureService, ng2_toastr_1.ToastsManager])
    ], CreateProcedureComponent);
    return CreateProcedureComponent;
}());
exports.CreateProcedureComponent = CreateProcedureComponent;
//# sourceMappingURL=create-procedure.component.js.map