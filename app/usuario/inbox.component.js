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
var edit_employee_service_1 = require('../edit-employee-profile/edit-employee-service');
var InboxUsuarioComponent = (function () {
    function InboxUsuarioComponent(router, authService, editEmployeeService, toastr) {
        this.router = router;
        this.authService = authService;
        this.editEmployeeService = editEmployeeService;
        this.toastr = toastr;
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        this.menus = localStorage.getItem("type_user") === '1' ? menu_mock_1.MENU_CDN : menu_mock_1.MENU_ADM;
    }
    InboxUsuarioComponent.prototype.deleteEmployee = function (item) {
        this.toastr.info("Eliminar: " + item.id, 'Alerta');
        console.log("Remove: ", item.id);
    };
    InboxUsuarioComponent.prototype.editEmployee = function (item) {
        this.editEmployeeService.employee = item;
        this.toastr.info("Editar: " + item.id, 'Alerta');
        var link = ['/editEmployee', item.cedula];
        this.router.navigate(link);
        console.log("Edit: ", item.id);
    };
    InboxUsuarioComponent.prototype.addEmployee = function () {
        this.router.navigate(['/signUpEmployee']);
    };
    InboxUsuarioComponent.prototype.ngOnInit = function () {
        //noinspection TypeScriptValidateTypes
        this.selectUsuario = [
            { nombre: 'Maria Antonia Ochoa Perez', cedula: 1234, email: 'mochoa@correo.com', tipo: '1', telefono: '', confirmPassword: '', password: '' },
            { nombre: 'Juan Carlos Marin Lopez', cedula: 2345, email: 'jlopez@correo.com', tipo: '1', telefono: '', confirmPassword: '', password: '' },
            { nombre: 'Johana Patricia Rojas Pinto', cedula: 3456, email: 'jpinto@correo.com', tipo: '1', telefono: '', confirmPassword: '', password: '' },
            { nombre: 'Rosa Cecilia Sanchez Gil', cedula: 4567, email: 'rsanchez@correo.com', tipo: '1', telefono: '', confirmPassword: '', password: '' }
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
            _this.toastr.error('hay un error', 'Alerta');
            _this.toastr.error(error.text(), 'Alerta');
            console.log(error.text());
        });
    };
    InboxUsuarioComponent.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    InboxUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'usuario',
            templateUrl: './app/usuario/inbox.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/usuario/inbox.component.css', './app/usuario/button-floating.css'],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, edit_employee_service_1.EditEmployeeService, ng2_toastr_1.ToastsManager])
    ], InboxUsuarioComponent);
    return InboxUsuarioComponent;
}());
exports.InboxUsuarioComponent = InboxUsuarioComponent;
//# sourceMappingURL=inbox.component.js.map