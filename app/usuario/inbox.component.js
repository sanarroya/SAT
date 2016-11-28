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
        if (localStorage.getItem("type_user") === '1') {
            this.menus = menu_mock_1.MENU_CDN;
        }
        else if (localStorage.getItem("type_user") === '2') {
            this.menus = menu_mock_1.MENU_FCN;
        }
        else {
            this.menus = menu_mock_1.MENU_ADM;
        }
    }
    InboxUsuarioComponent.prototype.deleteEmployee = function (employee) {
        var _this = this;
        this.authService.deleteEmployee(employee)
            .subscribe(function (response) {
            _this.toastr.info('Empleado eliminado', 'Alerta');
            var index = _this.employees.indexOf(employee);
            _this.employees.splice(index, 1);
        }, function (error) {
            _this.toastr.info('Empleado no eliminado', 'Alerta');
        });
    };
    InboxUsuarioComponent.prototype.editEmployee = function (employee) {
        this.editEmployeeService.employee = employee;
        this.router.navigate(['/editEmployee', employee.cedula]);
    };
    InboxUsuarioComponent.prototype.addEmployee = function () {
        this.router.navigate(['/signUpEmployee']);
    };
    InboxUsuarioComponent.prototype.ngOnInit = function () {
        this.getAllEmployees();
    };
    InboxUsuarioComponent.prototype.getAllEmployees = function () {
        var _this = this;
        this.authService.getAllEmployees()
            .subscribe(function (response) {
            _this.employees = response;
            console.log(_this.employees);
        }, function (error) {
            console.log(error);
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