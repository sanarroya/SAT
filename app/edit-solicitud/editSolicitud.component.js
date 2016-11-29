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
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var menu_mock_1 = require("../menu_mock");
var EditSolicitud = (function () {
    function EditSolicitud(router, authService, toastr) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.funcionarios = [];
        this.options = [
            {
                value: '0',
                label: 'Pendiente'
            },
            {
                value: '1',
                label: 'Progreso'
            },
            {
                value: '2',
                label: 'Finalizado'
            },
            {
                value: '3',
                label: 'Rechazado'
            }
        ];
        if (localStorage.getItem("type_user") === '1') {
            this.menus = menu_mock_1.MENU_CDN;
        }
        else if (localStorage.getItem("type_user") === '2') {
            this.menus = menu_mock_1.MENU_FCN;
        }
        else {
            this.menus = menu_mock_1.MENU_ADM;
        }
        this.placeholder1 = "Selecciona Funcionario";
        this.placeholder = "Selecciona Estado";
        if (localStorage.getItem("type_user") === '0' || (localStorage.getItem("type_user") != '1' && localStorage.getItem("type_user") != '2')) {
            this.getAllEmployees();
        }
    }
    EditSolicitud.prototype.getRequest = function () {
    };
    EditSolicitud.prototype.onBack = function () {
        this.router.navigate(['/inboxSolicitud']);
    };
    EditSolicitud.prototype.ngOnInit = function () {
        //this.param = this.router.url.split('/');
        /*if (this.param[2].length>0)
         alert("Detalle Trámite: " + this.param[2]);
         else
         alert("Nuevo Trámite: " + this.param[2]);*/
        //this.getInfoTramite();
    };
    EditSolicitud.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    EditSolicitud.prototype.onSelectOpened = function () {
        this.placeholder = "Selecciona Estado";
    };
    EditSolicitud.prototype.onSelected = function (item) {
        this.estado = item.value.toString();
        console.log('Selected: ' + item.value + ', ' + item.label);
        this.placeholder = "Selecciona Estado";
    };
    EditSolicitud.prototype.onSelectOpened1 = function () {
        this.placeholder1 = "Selecciona Funcionario";
    };
    EditSolicitud.prototype.onSelected1 = function (item) {
        this.funcionario = item.value.toString();
        console.log('Selected: ' + item.value + ', ' + item.label);
        this.placeholder1 = "Selecciona Estado";
    };
    EditSolicitud.prototype.getAllEmployees = function () {
        var _this = this;
        this.authService.getAllEmployees()
            .subscribe(function (response) {
            _this.employees = response;
            console.log("" + _this.employees.length);
            _this.employees.map(function (x) {
                var item = {
                    value: x.cedula,
                    label: x.nombre
                };
                _this.funcionarios.push(item);
            });
            console.log(_this.funcionarios);
        }, function (error) {
            console.log(error);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditSolicitud.prototype, "idSolicitud", void 0);
    EditSolicitud = __decorate([
        core_1.Component({
            selector: 'edit-solicitud',
            templateUrl: './app/edit-solicitud/editSolicitud.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/edit-solicitud/editSolicitud.component.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ng2_toastr_1.ToastsManager])
    ], EditSolicitud);
    return EditSolicitud;
}());
exports.EditSolicitud = EditSolicitud;
//# sourceMappingURL=editSolicitud.component.js.map