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
var campo_1 = require("../campo");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var FieldDetailComponent = (function () {
    function FieldDetailComponent(router, toastr) {
        this.router = router;
        this.toastr = toastr;
        this.campoSelected = new campo_1.campo();
        this.options = [
            {
                value: 'texto',
                label: 'Texto'
            },
            {
                value: 'documento',
                label: 'Documento'
            }
        ];
        console.log(localStorage.getItem("campoid"));
        console.log(localStorage.getItem("campo"));
        console.log(localStorage.getItem("type"));
        this.placeholder = "Selecciona tipo de campo";
        this.type = localStorage.getItem("type");
        this.num = localStorage.getItem("campoid");
        this.edit = localStorage.getItem("edit");
    }
    FieldDetailComponent.prototype.onBack = function () {
        this.router.navigate(["/procedure"]);
    };
    FieldDetailComponent.prototype.getCampo = function () {
        var campo1 = new campo_1.campo();
        campo1.nombre = localStorage.getItem("campo");
        campo1.tipo = localStorage.getItem("type");
        campo1.idCampo = localStorage.getItem("campoid");
        this.campoSelected = campo1;
    };
    FieldDetailComponent.prototype.submitTramite = function (nombre) {
        if ((nombre === null || nombre === "") || (this.type === null || this.type === "")) {
            this.toastr.error('Todos los campos son obligatorios', 'Alerta');
        }
        else {
            if (this.edit === "true") {
                console.log(this.num);
                localStorage.setItem("campoid", this.num);
            }
            else {
                var n = +this.num;
                n = n + 1;
                localStorage.setItem("campoid", n.toString());
            }
            console.log(nombre);
            console.log(this.type);
            localStorage.setItem("campo", nombre);
            localStorage.setItem("type", this.type);
            localStorage.setItem("operationDetail", "true");
            localStorage.setItem("fieldCamp", "true");
            this.router.navigate(['/procedure']);
        }
    };
    FieldDetailComponent.prototype.onSelected = function (item) {
        this.type = item.value.toString();
        console.log('Selected: ' + item.value + ', ' + item.label);
        this.placeholder = "Selecciona tipo de campo";
    };
    FieldDetailComponent.prototype.onSelectOpened = function () {
        this.placeholder = "Selecciona tipo campo";
    };
    FieldDetailComponent.prototype.ngOnInit = function () {
        this.getCampo();
    };
    FieldDetailComponent = __decorate([
        core_1.Component({
            selector: 'field-detail',
            templateUrl: './app/field-detail/field-detail.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/field-detail/field-detail.component.css'],
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.Router, ng2_toastr_1.ToastsManager])
    ], FieldDetailComponent);
    return FieldDetailComponent;
}());
exports.FieldDetailComponent = FieldDetailComponent;
//# sourceMappingURL=field-detail.component.js.map