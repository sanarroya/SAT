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
var user_1 = require('../user');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var SignInComponent = (function () {
    function SignInComponent(router, authService, toastr) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
    }
    SignInComponent.prototype.onSignIn = function (cedula, password) {
        var _this = this;
        var user = new user_1.User();
        user.cedula = cedula;
        user.password = password;
        this.authService.signIn(user)
            .subscribe(function (response) {
            localStorage.setItem('cedula_user', response.usuario.cedula);
            localStorage.setItem('id_token', response.token);
            localStorage.setItem('name', response.usuario.nombre);
            localStorage.setItem('type_user', response.usuario.tipo);
            console.log("tipo usuario " + response.usuario.tipo);
            _this.router.navigate(['/inboxTramite']);
        }, function (error) {
            var jsonObject = JSON.parse(error.text());
            _this.toastr.error("", 'Cedula o contraseña invalidas');
        });
    };
    SignInComponent.prototype.onRecoverPassword = function () {
        this.router.navigate(['/recoverPassword']);
    };
    SignInComponent.prototype.onSingup = function () {
        this.router.navigate(['/signup']);
    };
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'sing-in',
            templateUrl: './app/signin/signin.component.html',
            styleUrls: ['./app/signin/signin.component.css'],
            providers: [
                authentication_service_1.AuthenticationService
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ng2_toastr_1.ToastsManager])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=signin.component.js.map