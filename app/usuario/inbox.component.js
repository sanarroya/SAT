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
var InboxUsuarioComponent = (function () {
    function InboxUsuarioComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
    }
    InboxUsuarioComponent.prototype.removeItem = function (item) {
        alert("eliminar: " + item.id);
        console.log("Remove: ", item.id);
    };
    InboxUsuarioComponent.prototype.editItem = function (item) {
        alert("Editar" + item.cedula);
        var link = ['/editProfile', item.cedula];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    };
    InboxUsuarioComponent.prototype.newItem = function () {
        alert("Nuevo Usuario");
        var link = ['/editProfile', 0];
        this.router.navigate(link);
        console.log("Nuevo Uusuario");
    };
    InboxUsuarioComponent.prototype.ngOnInit = function () {
        this.selectUsuario = [
            { nombre: 'Maria Antonia Ochoa Perez', cedula: 1234, email: 'mochoa@correo.com', tipo: 'Funcionario', telefono: '', confirmPassword: '', password: '' },
            { nombre: 'Juan Carlos Marin Lopez', cedula: 2345, email: 'jlopez@correo.com', tipo: 'Funcionario', telefono: '', confirmPassword: '', password: '' },
            { nombre: 'Johana Patricia Rojas Pinto', cedula: 3456, email: 'jpinto@correo.com', tipo: 'Ciudadano', telefono: '', confirmPassword: '', password: '' },
            { nombre: 'Rosa Cecilia Sanchez Gil', cedula: 4567, email: 'rsanchez@correo.com', tipo: 'Ciudadano', telefono: '', confirmPassword: '', password: '' }
        ];
        this.username = "Administrador";
        //this.getAllUsuarios();
    };
    InboxUsuarioComponent.prototype.getAllUsuarios = function () {
        var _this = this;
        this.authService.getAllUsuarios()
            .subscribe(function (response) {
            _this.selectUsuario = response;
        }, function (error) {
            alert('hay un error');
            alert(error.text());
            console.log(error.text());
        });
    };
    InboxUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'usuario',
            templateUrl: './app/usuario/inbox.component.html',
            styleUrls: ['./app/usuario/inbox.component.css', './app/usuario/button-floating.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], InboxUsuarioComponent);
    return InboxUsuarioComponent;
}());
exports.InboxUsuarioComponent = InboxUsuarioComponent;
//# sourceMappingURL=inbox.component.js.map