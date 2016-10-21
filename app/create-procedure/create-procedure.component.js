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
var field_model_1 = require('../create-procedure/field-model');
var textbox_field_1 = require('../create-procedure/textbox-field');
var file_field_1 = require('../create-procedure/file-field');
var CreateProcedureComponent = (function () {
    function CreateProcedureComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.fieldModel = new field_model_1.FieldModel();
        this.menus = localStorage.getItem("type_user") === 'Ciudadano' ? menu_mock_1.MENU_CDN : menu_mock_1.MENU_ADM;
    }
    CreateProcedureComponent.prototype.ngOnInit = function () {
        this.drawFields();
    };
    CreateProcedureComponent.prototype.drawFields = function () {
        var field = new textbox_field_1.TextBoxField();
        field.key = 'lastName';
        field.text = 'Last name';
        field.required = true;
        field.order = 0;
        this.fieldModel.fields.push(field);
        field = new textbox_field_1.TextBoxField();
        field.key = 'firstName';
        field.text = 'First name';
        field.required = true;
        field.order = 1;
        this.fieldModel.fields.push(field);
        field = new file_field_1.FileField();
        field.key = 'extractoBancario';
        field.text = 'Extracto Bancario';
        field.required = true;
        field.order = 2;
        this.fieldModel.fields.push(field);
        //var element = document.createElement("input");
        //Assign different attributes to the element.
        //element.setAttribute("type", "file");
        //element.setAttribute("name", "htmlelent");
        //element.setAttribute("style","color: white; background-color: #05AFA8;");
        //document.body.appendChild(element);
    };
    CreateProcedureComponent = __decorate([
        core_1.Component({
            selector: 'create-procedure',
            templateUrl: './app/create-procedure/create-procedure.component.html',
            styles: ['']
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], CreateProcedureComponent);
    return CreateProcedureComponent;
}());
exports.CreateProcedureComponent = CreateProcedureComponent;
//# sourceMappingURL=create-procedure.component.js.map