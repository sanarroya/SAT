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
var InboxTramiteComponent = (function () {
    function InboxTramiteComponent(router, authService, toastr) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.selectTramite = [];
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        this.menus = localStorage.getItem("type_user") === 'Ciudadano' ? menu_mock_1.MENU_CDN : menu_mock_1.MENU_ADM;
        this.selectTramite = JSON.parse(localStorage.getItem("tramiteInbox")) === null ? [] : JSON.parse(localStorage.getItem("tramiteInbox"));
        var tramite = JSON.parse(localStorage.getItem("tramiteStored"));
        var edit = localStorage.getItem("editcampoStoredId");
        if (edit === "true") {
            localStorage.setItem("editcampoStoredId", "false");
            var index = +localStorage.getItem("campoStoredId");
            if (index > -1) {
                index = index - 1;
                this.selectTramite[index].nombre = tramite.nombre;
                this.selectTramite[index].descripcion = tramite.descripcion;
                this.selectTramite[index].campos = tramite.campos;
                this.selectTramite[index].id = tramite.id;
            }
        }
        else {
            if (tramite != null) {
                console.log("stored " + tramite.nombre);
                this.selectTramite.push(tramite);
                localStorage.setItem("tramiteStored", null);
            }
        }
    }
    InboxTramiteComponent.prototype.removeItem = function (item) {
        this.toastr.info("Eliminado: " + item.nombre, 'Alerta');
        console.log("Remove: ", item.nombre);
        var index = this.selectTramite.indexOf(item, 0);
        if (index > -1) {
            this.selectTramite.splice(index, 1);
        }
        localStorage.setItem("tramiteInbox", JSON.stringify(this.selectTramite));
    };
    InboxTramiteComponent.prototype.editItem = function (item) {
        this.toastr.info("Editar: " + item.nombre, 'Alerta');
        localStorage.setItem("tramiteInbox", JSON.stringify(this.selectTramite));
        localStorage.setItem("tramite", item.nombre);
        localStorage.setItem("descripcion", item.descripcion);
        localStorage.setItem("campos", JSON.stringify(item.campos));
        localStorage.setItem("campoStoredId", item.id);
        localStorage.setItem("editcampoStoredId", "true");
        var link = ['/procedure'];
        this.router.navigate(link);
        console.log("Edit: ", item.nombre);
    };
    InboxTramiteComponent.prototype.newItem = function () {
        this.toastr.info("Nuevo Trámite", 'Alerta');
        var campo = [];
        localStorage.setItem("campos", JSON.stringify(campo));
        localStorage.setItem("tramite", "");
        localStorage.setItem("descripcion", "");
        localStorage.setItem("edit", 'false');
        localStorage.setItem("campoid", "");
        localStorage.setItem("type", "");
        localStorage.setItem("campo", "");
        localStorage.setItem("editcampoStoredId", "false");
        localStorage.setItem("campoStoredId", this.selectTramite.length.toString());
        localStorage.setItem("tramiteInbox", JSON.stringify(this.selectTramite));
        var link = ['/procedure'];
        this.router.navigate(link);
        console.log("Nuevo Trámite: ");
    };
    InboxTramiteComponent.prototype.ngOnInit = function () {
    };
    InboxTramiteComponent.prototype.getAllTramites = function () {
        /* this.authService.getAllTramites()
         .subscribe(
         response => {
         this.selectTramite = response;
         },
         error => {
         this.toastr.error('hay un error', 'Alerta');
         this.toastr.error(error.text(), 'Alerta');
         console.log(error.text());
         }
         );*/
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