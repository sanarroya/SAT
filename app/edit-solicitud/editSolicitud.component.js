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
var requestState_1 = require("../requestState");
var requestFunc_1 = require("../requestFunc");
var EditSolicitud = (function () {
    function EditSolicitud(router, authService, toastr) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.solicitud = JSON.parse(localStorage.getItem("solicitud2"));
        this.estado = this.solicitud.estado;
        this.funcionario = this.solicitud.documentofuncionario;
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
    EditSolicitud.prototype.getRequest = function () {
    };
    EditSolicitud.prototype.onBack = function () {
        this.router.navigate(['/inboxSolicitud']);
    };
    EditSolicitud.prototype.ngOnInit = function () {
        if (localStorage.getItem("type_user") === '0' || (localStorage.getItem("type_user") != '1' && localStorage.getItem("type_user") != '2')) {
            this.getAllEmployees();
            this.getStates();
        }
        else if (localStorage.getItem("type_user") == '2') {
            this.getStates();
        }
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
    EditSolicitud.prototype.onUpdateState = function () {
        var _this = this;
        console.log(this.estado);
        var tramitex = new requestState_1.udpateState();
        tramitex.id = this.solicitud.id.toString();
        tramitex.state = this.estado;
        this.authService.updateState(tramitex)
            .subscribe(function (response) {
            _this.toastr.info("Estado Actualizado", 'Alerta');
        }, function (error) {
            _this.toastr.error("Error, por favor intente de nuevo", 'Alerta');
            console.log(error.toString());
        });
    };
    EditSolicitud.prototype.onUpdateFunc = function () {
        var _this = this;
        console.log(this.funcionario);
        var tramitex = new requestFunc_1.udpateFunc();
        tramitex.id = this.solicitud.id.toString();
        tramitex.idfuncionario = this.funcionario;
        console.log(JSON.stringify(tramitex));
        this.authService.updateFunction(tramitex)
            .subscribe(function (response) {
            _this.toastr.info("Funcionario Actualizado", 'Alerta');
        }, function (error) {
            _this.toastr.error("Error, por favor intente de nuevo", 'Alerta');
            console.log(error.toString());
        });
    };
    EditSolicitud.prototype.getAllEmployees = function () {
        var _this = this;
        this.authService.getAllEmployees()
            .subscribe(function (response) {
            _this.employees = response;
        }, function (error) {
            console.log(error);
        });
    };
    EditSolicitud.prototype.getStates = function () {
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