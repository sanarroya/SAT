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
        this.menus = localStorage.getItem("type_user") === 'Ciudadano' ? menu_mock_1.MENU_CDN : menu_mock_1.MENU_ADM;
    }
    EditSolicitud.prototype.getInfoSolicitud = function () {
        var _this = this;
        this.authService.getSolicitudProfile(localStorage.getItem('idTramite')).subscribe(function (response) {
            localStorage.setItem('cedula_user', response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            _this.selectSolicitud = response;
        }, function (error) {
            var jsonObject = JSON.parse(error.text());
            _this.toastr.error(jsonObject.message, 'Alerta');
            console.log(error.text());
            ;
        });
    };
    EditSolicitud.prototype.returnInboxSolicitud = function () {
        alert("Regresar");
        var link = ['/inboxSolicitud'];
        this.router.navigate(link);
        console.log("Regresar bandeja solicitud");
    };
    EditSolicitud.prototype.ngOnInit = function () {
        this.param = this.router.url.split('/');
        /*if (this.param[2].length>0)
         alert("Detalle Trámite: " + this.param[2]);
         else
         alert("Nuevo Trámite: " + this.param[2]);*/
        //this.getInfoTramite();
    };
    EditSolicitud.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    __decorate([
        core_1.Input, 
        __metadata('design:type', Object)
    ], EditSolicitud.prototype, "idSolicitud", void 0);
    EditSolicitud = __decorate([
        core_1.Component({
            selector: 'edit-tramite',
            templateUrl: './app/edit-solicitud/editSolicitud.component.html',
            styleUrls: ['./app/signin/signin.component.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ng2_toastr_1.ToastsManager])
    ], EditSolicitud);
    return EditSolicitud;
}());
exports.EditSolicitud = EditSolicitud;
//# sourceMappingURL=editSolicitud.component.js.map