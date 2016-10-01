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
var EditTramite = (function () {
    function EditTramite(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    EditTramite.prototype.getInfoTramite = function () {
        var _this = this;
        this.authService.getTramiteProfile(localStorage.getItem('idTramite')).subscribe(function (response) {
            localStorage.setItem('cedula_user', response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            _this.selectTramite = response;
        }, function (error) {
            var jsonObject = JSON.parse(error.text());
            alert(jsonObject.message);
            console.log(error.text());
            ;
        });
    };
    EditTramite.prototype.returnInboxTramite = function () {
        alert("Regresar");
        var link = ['/inboxTramite'];
        this.router.navigate(link);
        console.log("Regresar bandeja tramite");
    };
    EditTramite.prototype.ngOnInit = function () {
        this.param = this.router.url.split('/');
        if (this.param[2].length > 0)
            alert("Detalle Trámite: " + this.param[2]);
        else
            alert("Nuevo Trámite: " + this.param[2]);
        //this.getInfoTramite();
    };
    __decorate([
        core_1.Input, 
        __metadata('design:type', Object)
    ], EditTramite.prototype, "idTramite", void 0);
    EditTramite = __decorate([
        core_1.Component({
            selector: 'edit-tramite',
            templateUrl: './app/edit-tramite/editTramite.component.html',
            styleUrls: ['./app/tramite/inbox.component.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], EditTramite);
    return EditTramite;
}());
exports.EditTramite = EditTramite;
//# sourceMappingURL=editTramite.component.js.map