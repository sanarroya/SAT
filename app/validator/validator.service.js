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
var ValidatorService = (function () {
    function ValidatorService() {
        this.passwordRegex = new RegExp("^(" +
            "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])" + "|" +
            "(?=.*\\d)(?=.*[a-z])(?=.*[*!$%])" + "|" +
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[*!$%])" + "|" +
            "(?=.*\\d)(?=.*[A-Z])(?=.*[*!$%])" +
            ").{8,16}$");
        this.emailRegex = new RegExp("[A-Z0-9a-z._-]+@[A-Za-z0-9.-]+\\.[A-Za-z]+");
        this.phoneRegex = new RegExp("[0-9]{7,10}");
    }
    ValidatorService.prototype.isDocumentValid = function (cc) {
        if (cc.length >= 8 && cc.length <= 10) {
            return true;
        }
        else {
            return false;
        }
    };
    ValidatorService.prototype.isPasswordValid = function (password) {
        return this.passwordRegex.test(password);
    };
    ValidatorService.prototype.passwordsMatch = function (password, confirmPassword) {
        if (password == confirmPassword) {
            console.log("TRUE");
            return true;
        }
        else {
            console.log("False");
            return false;
        }
    };
    ValidatorService.prototype.isEmailValid = function (email) {
        return this.emailRegex.test(email);
    };
    ValidatorService.prototype.isPhoneValid = function (phone) {
        return this.phoneRegex.test(phone);
    };
    ValidatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ValidatorService);
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=validator.service.js.map