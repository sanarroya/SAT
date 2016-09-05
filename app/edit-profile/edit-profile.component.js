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
var EditProfileComponent = (function () {
    function EditProfileComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.selectUser = user_1.User();
    }
    EditProfileComponent.prototype.getUser = function () {
        var _this = this;
        this.authService.getUserProfile(localStorage.getItem('cedula_user')).subscribe(function (response) {
            localStorage.setItem('cedula_user', response.cedula);
            localStorage.setItem('name', response.nombre);
            localStorage.setItem('type_user', response.tipo);
            _this.selectUser = response;
        }, function (error) {
            var jsonObject = JSON.parse(error.text());
            alert(jsonObject.message);
            console.log(error.text());
            ;
        });
    };
    EditProfileComponent.prototype.updateUser = function (cedula, nombre, email, password, confirmPassword, telefono) {
        var _this = this;
        var user = new user_1.User();
        user.cedula = cedula;
        user.nombre = nombre;
        user.email = email;
        user.password = password;
        user.confirmPassword = confirmPassword;
        user.telefono = telefono;
        user.tipo = localStorage.getItem('type_user');
        this.authService.updateUser(user)
            .subscribe(function (response) {
            alert("Usuario actualizado");
            _this.router.navigate(['/editProfile']);
        }, function (error) {
            var jsonObject = JSON.parse(error.text());
            alert(jsonObject.message);
            console.log(error.text());
            _this.router.navigate(['/editProfile']);
        });
    };
    EditProfileComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    EditProfileComponent = __decorate([
        core_1.Component({
            selector: 'edit-profile',
            templateUrl: './app/edit-profile/edit-profile.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
            providers: [
                authentication_service_1.AuthenticationService
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=edit-profile.component.js.map