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
        this.num = 1;
        if (localStorage.getItem("type_user") === '1') {
            this.menus = menu_mock_1.MENU_CDN;
        }
        else if (localStorage.getItem("type_user") === '2') {
            this.menus = menu_mock_1.MENU_FCN;
        }
        else {
            this.menus = menu_mock_1.MENU_ADM;
        }
        var index = localStorage.getItem("editcampoStoredId");
        if (index > 0 && localStorage.getItem("fieldCamp") === "false") {
            this.getTramite(index.toString());
        }
        else if (localStorage.getItem("fieldCamp") === "true") {
            this.camposSelected = JSON.parse(localStorage.getItem("campos")) === null ? [] : JSON.parse(localStorage.getItem("campos"));
            this.tramiteSelected.nombre = localStorage.getItem("tramite");
            this.tramiteSelected.descripcion = localStorage.getItem("descripcion");
            if (localStorage.getItem("operationDetail") === "true") {
                localStorage.setItem("operationDetail", "false");
                if (localStorage.getItem("edit") === "true") {
                    localStorage.setItem("edit", "false");
                    var index_1 = +localStorage.getItem("campoid");
                    console.log("id campo1 " + index_1);
                    if (index_1 > -1) {
                        console.log("id campo 2 " + index_1);
                        this.camposSelected.filter(function (v) {
                            console.log("id campo 3 " + v.idcampo);
                            return v.idcampo == index_1;
                        }).map(function (x) {
                            x.nombre = localStorage.getItem("campo");
                            x.tipo = localStorage.getItem("type");
                            console.log("id campo 3 " + x.nombre);
                        });
                    }
                }
                else {
                    var camp = new campo_1.campo();
                    camp.idcampo = localStorage.getItem("campoid");
                    camp.nombre = localStorage.getItem("campo");
                    camp.tipo = localStorage.getItem("type");
                    this.camposSelected.push(camp);
                }
                localStorage.setItem("campos", JSON.stringify(this.camposSelected));
            }
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
                tramitex.id = localStorage.getItem("editcampoStoredId");
                tramitex.nombre = nomTramite;
                tramitex.descripcion = desTramite;
                tramitex.campos = this.camposSelected;
                console.log(JSON.stringify(tramitex));
                var index = localStorage.getItem("editcampoStoredId");
                if (index > 0) {
                    this.authService.updateProcedure(tramitex)
                        .subscribe(function (response) {
                        _this.toastr.info("Tramite Actualizado", 'Alerta');
                        _this.router.navigate(['/inboxTramite']);
                    }, function (error) {
                        _this.toastr.error("Error Actualizando el tramite, por favor intente de nuevo", 'Alerta');
                        console.log(error.toString());
                    });
                }
                else {
                    this.authService.createProcedure(tramitex)
                        .subscribe(function (response) {
                        _this.toastr.info("Tramite Creado", 'Alerta');
                        _this.router.navigate(['/inboxTramite']);
                    }, function (error) {
                        _this.toastr.error("Error creando el tramite, por favor intente de nuevo", 'Alerta');
                        console.log(error.toString());
                    });
                }
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
        localStorage.setItem("campoid", campo.idcampo + "");
        localStorage.setItem("type", campo.tipo);
        localStorage.setItem("campo", campo.nombre);
        localStorage.setItem("campos", JSON.stringify(this.camposSelected));
        this.router.navigate(['/fieldDetail']);
    };
    ProcedureComponent.prototype.onBack = function () {
        this.router.navigate(["/inboxTramite"]);
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
    ProcedureComponent.prototype.getTramite = function (id) {
        var _this = this;
        this.authService.getDetalleTramite(id)
            .subscribe(function (response) {
            _this.tramiteSelected = response;
            _this.camposSelected = _this.tramiteSelected.campos;
        }, function (error) {
            _this.toastr.error('hay un error', 'Alerta');
            _this.toastr.error(error.text(), 'Alerta');
            console.log(error.text());
        });
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