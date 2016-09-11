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
var RecoverPasswordComponent = (function () {
    function RecoverPasswordComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    RecoverPasswordComponent.prototype.onForgotPassword = function (cedula) {
        var _this = this;
        this.authService.recoverPassword(cedula)
            .subscribe(function (response) {
            alert(response.message);
            _this.router.navigate(['/signin']);
        }, function (error) {
            alert(error.json().message);
            console.log(error.text());
        });
    };
    RecoverPasswordComponent = __decorate([
        core_1.Component({
            selector: 'recover-password',
            templateUrl: './app/recover-password/recover-password.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/recover-password/recover-password.component.css'],
            providers: [
                authentication_service_1.AuthenticationService
            ]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router])
    ], RecoverPasswordComponent);
    return RecoverPasswordComponent;
}());
exports.RecoverPasswordComponent = RecoverPasswordComponent;
//# sourceMappingURL=recover-password.component.js.map