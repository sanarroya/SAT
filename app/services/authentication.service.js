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
        this.baseUrl = 'http://192.168.11.128';
        //User Endpoints
        this.singInEndpoint = '/userResource/login';
        this.singUpEndpoint = '/userResource/registerCitizen';
        this.recoverPasswordEndpoint = '/userResource/recoverPassword';
        this.userInfoEndpoint = '/userResource/getRegisteredUsers';
        this.updateUserEndpoint = '/userResource/updateUser';
        //Employees Endpoints
        this.getEmployeesEndpoint = '/userResource/getRegisteredUsersByType/2';
        this.deleteEmployeeEndpoint = '/userResource/deleteUser';
        //Procedures
        this.createProcedureEndpoint = '/procedureResource/createProcedure';
        this.getProcedureRequestsByUserEndpoint = '/procedureResource/getRequestProceduresByUser';
        this.getAllRequestOfProceduresEndPoint = '/procedureResource/getAllRequestProcedures';
        this.getDetailProcedureEndpoint = '/procedureResource/getProcedureByID';
        this.updateProcedureEndpoint = '/procedureResource/modifyProcedure';
        this.deleteProcedureEndPoint = "/procedureResource/deleteProcedure";
        this.tramitesEndpoint = '/procedureResource/getAllProcedures';
        this.solicitudEndpoint = '/procedureResource/getAllSolicitudes';
        this.updateFuncEndpoint = "/procedureResource/assignResponsableUR";
        this.updateStateEndpoint = "/procedureResource/changeState";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //User requests
    AuthenticationService.prototype.signIn = function (user) {
        return this.http.post(this.baseUrl + this.singInEndpoint, JSON.stringify(user), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.signUp = function (user) {
        return this.http.post(this.baseUrl + this.singUpEndpoint, JSON.stringify(user), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.recoverPassword = function (cedula) {
        return this.http.post(this.baseUrl + this.recoverPasswordEndpoint, JSON.stringify({ cedula: cedula }), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.getUserProfile = function (cedula) {
        var url = (this.baseUrl + this.userInfoEndpoint) + "/" + cedula;
        return this.http.get(url)
            .map(this.extractDataUsuarios);
    };
    AuthenticationService.prototype.updateUser = function (user) {
        return this.http.put(this.baseUrl + this.updateUserEndpoint, JSON.stringify(user), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.createProcedure = function (tramite) {
        return this.http.post(this.baseUrl + this.createProcedureEndpoint, JSON.stringify(tramite), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.updateProcedure = function (tramite) {
        return this.http.post(this.baseUrl + this.updateProcedureEndpoint, JSON.stringify(tramite), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.updateFunction = function (tramite) {
        return this.http.post(this.baseUrl + this.updateFuncEndpoint, JSON.stringify(tramite), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.updateState = function (tramite) {
        return this.http.post(this.baseUrl + this.updateStateEndpoint, JSON.stringify(tramite), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.deleteProcedure = function (tramite) {
        return this.http.post(this.baseUrl + this.deleteProcedureEndPoint, JSON.stringify(tramite), this.headers)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.getAllTramites = function () {
        var url = "" + (this.baseUrl + this.tramitesEndpoint);
        return this.http.get(url).map(this.extractData)
            .catch(this.handleError);
    };
    AuthenticationService.prototype.getDetalleTramite = function (id) {
        var url = (this.baseUrl + this.getDetailProcedureEndpoint) + "/" + id;
        return this.http.get(url)
            .map(this.extractDataOnly);
    };
    AuthenticationService.prototype.getRequests = function () {
        return this.http.get(this.baseUrl + this.getAllRequestOfProceduresEndPoint)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthenticationService.prototype.getRequestsByUser = function (id) {
        var url = (this.baseUrl + this.getProcedureRequestsByUserEndpoint) + "/" + id;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthenticationService.prototype.getAllEmployees = function () {
        var url = this.baseUrl + this.getEmployeesEndpoint;
        return this.http.get(url)
            .map(function (response) {
            return response.json().usuarios;
        });
    };
    AuthenticationService.prototype.deleteEmployee = function (employee) {
        return this.http.post(this.baseUrl + this.deleteEmployeeEndpoint, JSON.stringify(employee), this.headers)
            .map(function (res) { return res.json(); });
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
    //Metodo to manipulate data
    AuthenticationService.prototype.extractDataUsuarios = function (res) {
        // alert(res.json().usuarios[0])
        var body = res.json();
        return body.usuarios[0] || {};
    };
    //Metodo para manejar los errores
    AuthenticationService.prototype.handleError = function (error) {
        var errMsg = error.status ? "" + error.status : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    AuthenticationService.prototype.getSolicitudProfile = function (item) {
    };
    AuthenticationService.prototype.getTramiteProfile = function (item) {
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map