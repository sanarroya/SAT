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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:44111';
        this.singInEndpoint = '/userResource/login';
        this.singUpEndpoint = '/userResource/registerCitizen';
        this.recoverPasswordEndpoint = '/userResource/recoverPassword';
        this.userInfoEndpoint = '/userResource/getRegisteredUsers';
        this.updateUserEndpoint = '/userResource/updateUser';
        this.tramitesEndpoint = '/procedureResource/getAllProcedures';
        this.solicitudEndpoint = '/procedureResource/getAllSolicitudes';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AuthenticationService.prototype.signIn = function (user) {
        return this.http.post(this.baseUrl + this.singInEndpoint, JSON.stringify(user), this.headers)
            .map(function (res) { return res.json(); });
    };
    //TODO - Cambiar el tipo del observador
    AuthenticationService.prototype.signUp = function (user) {
        return this.http.post(this.baseUrl + this.singUpEndpoint, JSON.stringify(user), this.headers)
            .map(function (res) { return res.json(); });
    };
    //TODO - Cambiar el tipo del observador
    AuthenticationService.prototype.recoverPassword = function (cedula) {
        return this.http.post(this.baseUrl + this.recoverPasswordEndpoint, JSON.stringify({ cedula: cedula }), this.headers)
            .map(function (res) { return res.json(); });
    };
    //TODO - Cambiar el tipo del observador
    AuthenticationService.prototype.getUserProfile = function (cedula) {
        var url = (this.baseUrl + this.userInfoEndpoint) + "/" + cedula;
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.updateUser = function (user) {
        return this.http.put(this.baseUrl + this.updateUserEndpoint, JSON.stringify(user), this.headers)
            .map(function (res) { return res.json(); });
    };
    //Metodo para traer todos los tramites registrados
    AuthenticationService.prototype.getAllTramites = function () {
        var authHeader = new http_1.Headers();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:44111/procedureResource/getAllProcedures/', {
            headers: headers
        }).map(this.extractData)
            .catch(this.handleError);
    };
    AuthenticationService.prototype.getAllSolicitudes = function () {
        var authHeader = new http_1.Headers();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:44111/procedureResource/getAllSolicitudes/', {
            headers: headers
        }).map(this.extractData)
            .catch(this.handleError);
    };
    //Metodo to manipulate data
    AuthenticationService.prototype.extractData = function (res) {
        var body = res.json();
        return body.tramites || {};
    };
    //Metodo para extraer un solo dato
    AuthenticationService.prototype.extractDataOnly = function (res) {
        var body = res.json();
        return body;
    };
    //Metodo para manejar los errores
    AuthenticationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = error.status ? "" + error.status : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map