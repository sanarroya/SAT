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
var GridComponent = (function () {
    function GridComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
    }
    GridComponent.prototype.getTramite = function () {
        var _this = this;
        this.authService.getTramiteProfile(localStorage.getItem('cedula_user')).subscribe(function (response) {
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
    GridComponent.prototype.removeItem = function (item) {
        alert("eliminar: " + item.id);
        //this.data = this.filter(this.data, (elem) => elem != item);
        console.log("Remove: ", item.email);
    };
    GridComponent.prototype.editItem = function (item) {
        alert("Editar" + item.id);
        //this.data = filter(this.data, (elem) => elem != item);
        var link = ['/editTramite', item.id];
        this.router.navigate(link);
        console.log("Edit: ", item.email);
    };
    GridComponent.prototype.ngOnInit = function () {
        alert("ingresó al ngOnInit");
        //this.getTramite();
        this.selectTramite = [
            { descripcion: 'descripicion del tramite1', nombre: 'tramite1', id: 1 },
            { descripcion: 'descripicion del tramite2', nombre: 'tramite2', id: 2 },
            { descripcion: 'descripicion del tramite3', nombre: 'tramite3', id: 3 },
            { descripcion: 'descripicion del tramite4', nombre: 'tramite4', id: 4 }
        ];
    };
    GridComponent = __decorate([
        core_1.Component({
            selector: 'edit-tramite',
            templateUrl: './app/edit-tramite/edit-tramite.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/edit-tramite/edit-tramite.component.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], GridComponent);
    return GridComponent;
}());
exports.GridComponent = GridComponent;
//# sourceMappingURL=edit.component.js.map