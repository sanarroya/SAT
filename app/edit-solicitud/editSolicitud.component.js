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
var menu_mock_1 = require('../menu_mock');
var requestState_1 = require('../requestState');
var requestFunc_1 = require('../requestFunc');
var EditSolicitud = (function () {
    function EditSolicitud(router, authService, toastr) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.admin = false;
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
        this.solicitud = JSON.parse(localStorage.getItem("solicitud2"));
        this.fields = this.solicitud.campos;
        this.funcionario = this.solicitud.documentofuncionario;
        var state = this.findStateNameWithValue(this.solicitud.estado);
        this.valueEstado = state.value;
        this.estado = state.label;
        if (localStorage.getItem("type_user") === '1') {
            this.menus = menu_mock_1.MENU_CDN;
            this.admin = false;
        }
        else if (localStorage.getItem("type_user") === '2') {
            this.menus = menu_mock_1.MENU_FCN;
            this.admin = true;
        }
        else {
            this.menus = menu_mock_1.MENU_ADM;
            this.admin = true;
        }
    }
    EditSolicitud.prototype.onBack = function () {
        this.router.navigate(['/inboxSolicitud']);
    };
    EditSolicitud.prototype.ngOnInit = function () {
        if (localStorage.getItem("type_user") === '0' || (localStorage.getItem("type_user") != '1' && localStorage.getItem("type_user") != '2')) {
            this.getAllEmployees();
        }
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
        });
    };
    EditSolicitud.prototype.onUpdateFunc = function () {
        var _this = this;
        var tramitex = new requestFunc_1.udpateFunc();
        tramitex.id = this.solicitud.id.toString();
        tramitex.idfuncionario = this.funcionario;
        this.authService.updateFunction(tramitex)
            .subscribe(function (response) {
            _this.toastr.info("Funcionario Actualizado", 'Alerta');
        }, function (error) {
            _this.toastr.error("Error, por favor intente de nuevo", 'Alerta');
        });
    };
    EditSolicitud.prototype.getAllEmployees = function () {
        var _this = this;
        this.authService.getAllEmployees().subscribe(function (response) {
            _this.employees = response;
        }, function (error) {
            _this.toastr.error("Error, por favor intente de nuevo", 'Alerta');
        });
    };
    EditSolicitud.prototype.findStateNameWithValue = function (value) {
        for (var i = 0; i < this.options.length; i++) {
            var state = this.options[i];
            if (state.value == value) {
                return state;
            }
        }
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