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
var validator_service_1 = require('../validator/validator.service');
var user_1 = require('../user');
var SignUpComponent = (function () {
    function SignUpComponent(router, authService, validator) {
        this.router = router;
        this.authService = authService;
        this.validator = validator;
    }
    SignUpComponent.prototype.onSignUp = function (cedula, nombre, email, password, confirmPassword, telefono) {
        var _this = this;
        var user = new user_1.User();
        console.log(cedula);
        user.cedula = cedula.toString();
        user.nombre = nombre;
        user.email = email;
        user.password = password;
        user.confirmPassword = confirmPassword;
        user.telefono = telefono;
        user.tipo = "2";
        if (!this.validator.isDocumentValid(user.cedula)) {
            alert("Por favor ingrese un documento valido");
        }
        else if (!this.validator.isEmailValid(user.email)) {
            alert("Por favor ingrese un email valido");
        }
        else if (!this.validator.isPasswordValid(user.password)) {
            alert("Por favor ingrese una contraseña valida");
        }
        else if (!this.validator.isPasswordValid(user.confirmPassword)) {
            alert("Por favor ingrese una contraseña valida");
        }
        else if (!this.validator.passwordsMatch(user.password, user.confirmPassword)) {
            alert("Las claves no coinciden");
        }
        else if (!this.validator.isPhoneValid(user.telefono)) {
            alert("Por favor ingrese un telegono valido");
        }
        else {
            this.authService.signUp(user)
                .subscribe(function (response) {
                alert("Usuario Creado");
                _this.router.navigate(['/signin']);
            }, function (error) {
                var jsonObject = JSON.parse(error.text());
                alert(jsonObject.message);
                console.log(error.text());
            });
        }
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'sign-up',
            templateUrl: '/app/signup/signup.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/signup/signup.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, validator_service_1.ValidatorService])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map