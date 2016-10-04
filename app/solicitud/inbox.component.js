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
var InboxSolicitudComponent = (function () {
    function InboxSolicitudComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
    }
    InboxSolicitudComponent.prototype.removeItem = function (item) {
        alert("eliminar: " + item.id);
        console.log("Remove: ", item.id);
    };
    InboxSolicitudComponent.prototype.editItem = function (item) {
        alert("Editar" + item.id);
        var link = ['/editSolicitud', item.id];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    };
    InboxSolicitudComponent.prototype.newItem = function () {
        alert("Nueva Solicitud");
        var link = ['/editSolicitud', 0];
        this.router.navigate(link);
        console.log("Nueva Solicitud");
    };
    InboxSolicitudComponent.prototype.ngOnInit = function () {
        //alert("Bandeja Solicitud");
        this.selectSolicitud = [
            { descripcion: 'descripicion de solicitud 1', nombre: 'solicitud 1', id: 1 },
            { descripcion: 'descripicion de solicitud 2', nombre: 'solicitud 2', id: 2 },
            { descripcion: 'descripicion de solicitud 3', nombre: 'solicitud 3', id: 3 },
            { descripcion: 'descripicion de solicitud 4', nombre: 'solicitud 4', id: 4 }
        ];
        this.username = "Administrador";
        //this.getAllSolicitudes();
    };
    InboxSolicitudComponent.prototype.getAllSolicitudes = function () {
        var _this = this;
        this.authService.getAllSolicitudes()
            .subscribe(function (response) {
            _this.selectSolicitud = response;
        }, function (error) {
            alert('hay un error');
            alert(error.text());
            console.log(error.text());
        });
    };
    InboxSolicitudComponent = __decorate([
        core_1.Component({
            selector: 'tramite',
            templateUrl: './app/solicitud/inbox.component.html',
            styleUrls: ['./app/solicitud/inbox.component.css', './app/solicitud/button-floating.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], InboxSolicitudComponent);
    return InboxSolicitudComponent;
}());
exports.InboxSolicitudComponent = InboxSolicitudComponent;
//# sourceMappingURL=inbox.component.js.map