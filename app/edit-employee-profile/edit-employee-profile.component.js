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
var menu_mock_1 = require("../menu_mock");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var edit_employee_service_1 = require('../edit-employee-profile/edit-employee-service');
var EditEmployeeProfileComponent = (function () {
    function EditEmployeeProfileComponent(router, authService, editEmployeeService, toastr) {
        this.router = router;
        this.authService = authService;
        this.editEmployeeService = editEmployeeService;
        this.toastr = toastr;
        this.selectUser = new user_1.User();
        this.menus = localStorage.getItem("type_user") === '1' ? menu_mock_1.MENU_CDN : menu_mock_1.MENU_ADM;
    }
    EditEmployeeProfileComponent.prototype.getUser = function () {
        this.selectUser = this.editEmployeeService.employee;
        console.log(this.selectUser);
        // this.authService.getUserProfile(localStorage.getItem('cedula_user')).subscribe(response => {
        //     localStorage.setItem('cedula_user', <string>response.cedula);
        //     localStorage.setItem('name', response.nombre);
        //     localStorage.setItem('type_user', response.tipo);
        //     this.selectUser = response;
        // }, error => {
        //     let jsonObject = JSON.parse(error.text());
        //     this.toastr.error(jsonObject.message, 'Alerta');
        //     console.log(error.text());
        // });
    };
    EditEmployeeProfileComponent.prototype.updateUser = function (cedula, nombre, email, password, confirmPassword, telefono) {
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
            _this.toastr.info("Usuario actualizado", 'Alerta');
            _this.router.navigate(['/editProfile']);
        }, function (error) {
            var jsonObject = JSON.parse(error.text());
            _this.toastr.error(jsonObject.message, 'Alerta');
            console.log(error.text());
            _this.router.navigate(['/editProfile']);
        });
    };
    EditEmployeeProfileComponent.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    EditEmployeeProfileComponent.prototype.onBack = function () {
        this.editEmployeeService.employee = new user_1.User();
        this.router.navigate(['/inboxUsuario']);
    };
    EditEmployeeProfileComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    EditEmployeeProfileComponent = __decorate([
        core_1.Component({
            selector: 'edit-profile',
            templateUrl: './app/edit-employee-profile/edit-employee-profile.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
            providers: [
                authentication_service_1.AuthenticationService
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, edit_employee_service_1.EditEmployeeService, ng2_toastr_1.ToastsManager])
    ], EditEmployeeProfileComponent);
    return EditEmployeeProfileComponent;
}());
exports.EditEmployeeProfileComponent = EditEmployeeProfileComponent;
//# sourceMappingURL=edit-employee-profile.component.js.map