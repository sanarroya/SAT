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
var InboxTramiteComponent = (function () {
    function InboxTramiteComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
    }
    InboxTramiteComponent.prototype.removeItem = function (item) {
        alert("eliminar: " + item.id);
        console.log("Remove: ", item.id);
    };
    InboxTramiteComponent.prototype.editItem = function (item) {
        alert("Editar" + item.id);
        var link = ['/editTramite', item.id];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    };
    InboxTramiteComponent.prototype.newItem = function () {
        alert("Nuevo Trámite");
        var link = ['/editTramite', 0];
        this.router.navigate(link);
        console.log("Nuevo Trámite: ");
    };
    InboxTramiteComponent.prototype.ngOnInit = function () {
        //alert("Bandeja Trámites");
        this.selectTramite = [
            { descripcion: 'descripicion del tramite1', nombre: 'tramite1', id: 1 },
            { descripcion: 'descripicion del tramite2', nombre: 'tramite2', id: 2 },
            { descripcion: 'descripicion del tramite3', nombre: 'tramite3', id: 3 },
            { descripcion: 'descripicion del tramite4', nombre: 'tramite4', id: 4 }
        ];
        this.username = "Administrador";
        //this.getAllTramites();
    };
    InboxTramiteComponent.prototype.getAllTramites = function () {
        var _this = this;
        this.authService.getAllTramites()
            .subscribe(function (response) {
            _this.selectTramite = response;
        }, function (error) {
            alert('hay un error');
            alert(error.text());
            console.log(error.text());
        });
    };
    InboxTramiteComponent = __decorate([
        core_1.Component({
            selector: 'tramite',
            templateUrl: './app/tramite/inbox.component.html',
            styleUrls: ['./app/tramite/inbox.component.css', './app/tramite/button-floating.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], InboxTramiteComponent);
    return InboxTramiteComponent;
}());
exports.InboxTramiteComponent = InboxTramiteComponent;
//# sourceMappingURL=inbox.component.js.map