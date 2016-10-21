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
var tramites_1 = require("../tramites");
var campo_1 = require("../campo");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ProcedureComponent = (function () {
    function ProcedureComponent(router, authService, toastr) {
        this.router = router;
        this.authService = authService;
        this.toastr = toastr;
        this.camposSelected = [];
        this.tramiteSelected = new tramites_1.tramites();
        this.menus = localStorage.getItem("type_user") == 'Ciudadano' ? menu_mock_1.MENU_CDN : menu_mock_1.MENU_ADM;
        this.camposSelected = JSON.parse(localStorage.getItem("campos")) === null ? [] : JSON.parse(localStorage.getItem("campos"));
        this.tramiteSelected.nombre = localStorage.getItem("tramite");
        this.tramiteSelected.descripcion = localStorage.getItem("descripcion");
        if (localStorage.getItem("operationDetail") === "true") {
            localStorage.setItem("operationDetail", "false");
            if (localStorage.getItem("edit") === "true") {
                localStorage.setItem("edit", "false");
                var index = +localStorage.getItem("campoid");
                if (index > -1) {
                    index = index - 1;
                    this.camposSelected[index].nombre = localStorage.getItem("campo");
                    this.camposSelected[index].tipo = localStorage.getItem("type");
                }
            }
            else {
                var camp = new campo_1.campo();
                camp.id = localStorage.getItem("campoid");
                camp.nombre = localStorage.getItem("campo");
                camp.tipo = localStorage.getItem("type");
                this.camposSelected.push(camp);
            }
            localStorage.setItem("campos", JSON.stringify(this.camposSelected));
        }
    }
    ProcedureComponent.prototype.createProcedure = function (nomTramite, desTramite) {
        var _this = this;
        var lenghtC = 0;
        if (nomTramite == null || nomTramite === "" || desTramite === null || desTramite === "" || this.camposSelected === null) {
            this.toastr.error('Un Tramite todos los campos son obligatorios', 'Alerta');
        }
        else {
            var lenghtC_1 = +this.camposSelected.length;
            if (lenghtC_1 > 0) {
                var tramitex = new tramites_1.tramites();
                tramitex.nombre = nomTramite;
                tramitex.descripcion = desTramite;
                tramitex.campos = this.camposSelected;
                this.authService.createProcedure(tramites_1.tramites)
                    .subscribe(function (response) {
                    _this.toastr.info("Tramite Creado", 'Alerta');
                    _this.camposSelected.splice(0, _this.camposSelected.length);
                    localStorage.setItem("campos", JSON.stringify(_this.camposSelected));
                    localStorage.setItem("tramite", "");
                    localStorage.setItem("descripcion", "");
                    localStorage.setItem("edit", 'false');
                    localStorage.setItem("campoid", "");
                    localStorage.setItem("type", "");
                    localStorage.setItem("campo", "");
                    _this.router.navigate(['/editProfile']);
                }, function (error) {
                    var jsonObject = JSON.parse(error.text());
                    _this.toastr.error("Error creando el tramite, por favor intente de nuevo", 'Alerta');
                    console.log(error.text());
                });
            }
            else {
                this.toastr.error('Un Tramite debe tener al menos un campo', 'Alerta');
            }
        }
    };
    ProcedureComponent.prototype.onSelect = function (hero) {
        this.router.navigate([hero.id]);
    };
    ProcedureComponent.prototype.onSelectEditCampo = function (campo) {
        localStorage.setItem("tramite", this.tramiteSelected.nombre);
        localStorage.setItem("descripcion", this.tramiteSelected.descripcion);
        localStorage.setItem("edit", 'true');
        localStorage.setItem("campoid", campo.id);
        localStorage.setItem("type", campo.tipo);
        localStorage.setItem("campo", campo.nombre);
        localStorage.setItem("campos", JSON.stringify(this.camposSelected));
        this.router.navigate(['/fieldDetail']);
    };
    ProcedureComponent.prototype.onSelectRemoveCampo = function (campo) {
        var index = this.camposSelected.indexOf(campo, 0);
        if (index > -1) {
            this.camposSelected.splice(index, 1);
        }
        localStorage.setItem("campos", JSON.stringify(this.camposSelected));
    };
    ProcedureComponent.prototype.onFielDetail = function () {
        var le = 0;
        if (this.camposSelected != null) {
            le = this.camposSelected.length;
            localStorage.setItem("campos", JSON.stringify(this.camposSelected));
        }
        localStorage.setItem("campoid", le.toString());
        localStorage.setItem("type", "");
        localStorage.setItem("campo", "");
        localStorage.setItem("edit", 'false');
        localStorage.setItem("tramite", this.tramiteSelected.nombre);
        localStorage.setItem("descripcion", this.tramiteSelected.descripcion);
        this.router.navigate(['/fieldDetail']);
    };
    ProcedureComponent.prototype.ngOnInit = function () {
    };
    ProcedureComponent = __decorate([
        core_1.Component({
            selector: 'procedure',
            templateUrl: './app/procedure/procedure.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/procedure/procedure.component.css'],
            providers: [
                authentication_service_1.AuthenticationService
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ng2_toastr_1.ToastsManager])
    ], ProcedureComponent);
    return ProcedureComponent;
}());
exports.ProcedureComponent = ProcedureComponent;
//# sourceMappingURL=procedure.component.js.map