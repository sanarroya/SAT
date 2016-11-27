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
var deleteProcedure_1 = require("../deleteProcedure");
var InboxTramiteComponent = (function () {
    function InboxTramiteComponent(router, authService, toastr) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.selectTramite = [];
        this.admin = false;
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        this.menus = localStorage.getItem("type_user") === '1' ? menu_mock_1.MENU_CDN : menu_mock_1.MENU_ADM;
        this.admin = localStorage.getItem("type_user") === '1' ? false : true;
    }
    InboxTramiteComponent.prototype.removeItem = function (item) {
        var _this = this;
        console.log("Remove: ", item.nombre);
        var tramitex = new deleteProcedure_1.DeleteTramite();
        tramitex.id = item.id;
        console.log(JSON.stringify(tramitex));
        this.authService.deleteProcedure(tramitex)
            .subscribe(function (response) {
            _this.toastr.info("Tramite Eliminado", 'Alerta');
            _this.getAllTramites();
        }, function (error) {
            _this.toastr.error("Error Eliminando el tramite, por favor intente de nuevo", 'Alerta');
            console.log(error.toString());
        });
    };
    InboxTramiteComponent.prototype.editItem = function (item) {
        this.toastr.info("Editar: " + item.nombre, 'Alerta');
        localStorage.setItem("editcampoStoredId", item.id.toString());
        localStorage.setItem("fieldCamp", "false");
        var link = ['/procedure'];
        this.router.navigate(link);
        console.log("Edit: ", item.nombre);
    };
    InboxTramiteComponent.prototype.newItem = function () {
        this.toastr.info("Nuevo Trámite", 'Alerta');
        localStorage.setItem("editcampoStoredId", "0");
        localStorage.setItem("fieldCamp", "false");
        var link = ['/procedure'];
        this.router.navigate(link);
        console.log("Nuevo Trámite: ");
    };
    InboxTramiteComponent.prototype.onNewProcedure = function (item) {
        if (!this.admin) {
            this.router.navigate(['/createProcedure']);
        }
    };
    InboxTramiteComponent.prototype.change = function () {
        this.admin = !this.admin;
    };
    InboxTramiteComponent.prototype.ngOnInit = function () {
        this.getAllTramites();
    };
    InboxTramiteComponent.prototype.getAllTramites = function () {
        var _this = this;
        this.authService.getAllTramites()
            .subscribe(function (response) {
            _this.selectTramite = response;
        }, function (error) {
            _this.toastr.error('hay un error', 'Alerta');
            _this.toastr.error(error.text(), 'Alerta');
            console.log(error.text());
        });
    };
    InboxTramiteComponent.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    InboxTramiteComponent = __decorate([
        core_1.Component({
            selector: 'tramite',
            templateUrl: './app/tramite/inbox.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/tramite/inbox.component.css', './app/tramite/button-floating.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ng2_toastr_1.ToastsManager])
    ], InboxTramiteComponent);
    return InboxTramiteComponent;
}());
exports.InboxTramiteComponent = InboxTramiteComponent;
//# sourceMappingURL=inbox.component.js.map