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
var menu_mock_1 = require("../menu_mock");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var InboxSolicitudComponent = (function () {
    function InboxSolicitudComponent(router, authService, toastr) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.user = false;
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        if (localStorage.getItem("type_user") === '1') {
            this.menus = menu_mock_1.MENU_CDN;
            this.user = true;
        }
        else if (localStorage.getItem("type_user") === '2') {
            this.menus = menu_mock_1.MENU_FCN;
            this.user = false;
        }
        else {
            this.menus = menu_mock_1.MENU_ADM;
            this.user = false;
        }
    }
    InboxSolicitudComponent.prototype.removeItem = function (item) {
        this.toastr.info("eliminar: " + item.id, 'Alerta');
        console.log("Remove: ", item.id);
    };
    InboxSolicitudComponent.prototype.editItem = function (item) {
        this.toastr.info("Editar" + item.id, 'Alerta');
        var link = ['/editSolicitud', item.id];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    };
    InboxSolicitudComponent.prototype.newItem = function () {
        this.toastr.info("Nueva Solicitud", 'Alerta');
        var link = ['/editSolicitud', 0];
        this.router.navigate(link);
        console.log("Nueva Solicitud");
    };
    InboxSolicitudComponent.prototype.ngOnInit = function () {
        if (this.user) {
            this.getRequestsOfUser();
        }
        else {
            this.getRequests();
        }
    };
    InboxSolicitudComponent.prototype.getRequests = function () {
        var _this = this;
        console.log("REQUESTS");
        this.authService.getRequests().subscribe(function (response) {
            _this.selectSolicitud = response;
            console.log(response);
        }, function (error) {
            _this.toastr.error(error.text(), 'Alerta');
        });
    };
    InboxSolicitudComponent.prototype.getRequestsOfUser = function () {
        var _this = this;
        console.log("REQUESTS OF USER");
        this.authService.getRequestsByUser(localStorage.getItem('cedula_user')).subscribe(function (response) {
            _this.selectSolicitud = response;
            console.log(response);
        }, function (error) {
            _this.toastr.error(error.text(), 'Alerta');
        });
    };
    InboxSolicitudComponent.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    InboxSolicitudComponent = __decorate([
        core_1.Component({
            selector: 'tramite',
            templateUrl: './app/solicitud/inbox.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/solicitud/inbox.component.css', './app/solicitud/button-floating.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ng2_toastr_1.ToastsManager])
    ], InboxSolicitudComponent);
    return InboxSolicitudComponent;
}());
exports.InboxSolicitudComponent = InboxSolicitudComponent;
//# sourceMappingURL=inbox.component.js.map