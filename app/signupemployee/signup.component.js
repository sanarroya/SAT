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
var validator_service_1 = require('../validator/validator.service');
var menu_mock_1 = require("../menu_mock");
var SignUpEmployeeComponent = (function () {
    function SignUpEmployeeComponent(router, authService, toastr, validator) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.validator = validator;
        this.menus = localStorage.getItem("type_user") === '1' ? menu_mock_1.MENU_CDN : menu_mock_1.MENU_ADM;
    }
    SignUpEmployeeComponent.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    SignUpEmployeeComponent.prototype.onSignUp = function (cedula, nombre, email, password, confirmPassword, telefono) {
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
            this.toastr.error("Por favor ingrese un documento valido", "Alerta");
        }
        else if (!this.validator.isEmailValid(user.email)) {
            this.toastr.error("Por favor ingrese un email valido", "Alerta");
            alert("Por favor ingrese un email valido");
        }
        else if (!this.validator.isPasswordValid(user.password)) {
            this.toastr.error("Por favor ingrese una contraseña valida: 8-16 caracteres, un numero, una minuscula, una mayuscula y uno de los siguientes caracteres !%*$", "Alerta");
        }
        else if (!this.validator.isPasswordValid(user.confirmPassword)) {
            this.toastr.error("Por favor ingrese una contraseña valida: 8-16 caracteres, un numero, una minuscula, una mayuscula y uno de los siguientes caracteres !%*$", "Alerta");
        }
        else if (!this.validator.passwordsMatch(user.password, user.confirmPassword)) {
            this.toastr.error("Las contraseñas no coinciden", "Alerta");
        }
        else if (!this.validator.isPhoneValid(user.telefono)) {
            this.toastr.error("Por favor ingrese un teléfono valido", "Alerta");
        }
        else {
            this.authService.signUpFuncionario(user)
                .subscribe(function (response) {
                _this.toastr.info("Usuario Creado", 'Alerta');
                _this.router.navigate(['/signin']);
            }, function (error) {
                var jsonObject = JSON.parse(error.text());
                _this.toastr.error(jsonObject.message, 'Alerta');
                console.log(error.text());
            });
        }
    };
    SignUpEmployeeComponent = __decorate([
        core_1.Component({
            selector: 'sign-up',
            templateUrl: '/app/signupemployee/signup.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ng2_toastr_1.ToastsManager, validator_service_1.ValidatorService])
    ], SignUpEmployeeComponent);
    return SignUpEmployeeComponent;
}());
exports.SignUpEmployeeComponent = SignUpEmployeeComponent;
//# sourceMappingURL=signup.component.js.map