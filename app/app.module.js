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
//Angular 2 imports
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var button_1 = require('@angular2-material/button');
var icon_1 = require('@angular2-material/icon');
var card_1 = require('@angular2-material/card');
var input_1 = require('@angular2-material/input');
var toolbar_1 = require('@angular2-material/toolbar');
var sidenav_1 = require('@angular2-material/sidenav');
var angular2_select_1 = require('angular2-select');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
//SAT - Components
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
//Authentication
var signin_component_1 = require('./signin/signin.component');
var signup_component_1 = require('./signup/signup.component');
var recover_password_component_1 = require('./recover-password/recover-password.component');
//Edit profile
var edit_profile_component_1 = require('./edit-profile/edit-profile.component');
//Procedures
var inbox_component_1 = require('./tramite/inbox.component');
var procedure_component_1 = require('./procedure/procedure.component');
var editTramite_component_1 = require('./edit-tramite/editTramite.component');
var field_detail_component_1 = require('./field-detail/field-detail.component');
//Procedure request
var inbox_component_2 = require('./solicitud/inbox.component');
var editSolicitud_component_1 = require('./edit-solicitud/editSolicitud.component');
var create_procedure_component_1 = require('./create-procedure/create-procedure.component');
var survey_component_1 = require('./create-procedure/survey.component');
//Employee management
var inbox_component_3 = require('./usuario/inbox.component');
var signup_employee_component_1 = require('./signup-employee/signup-employee.component');
var edit_employee_profile_component_1 = require('./edit-employee-profile/edit-employee-profile.component');
//SAT - Services
var authentication_service_1 = require('./services/authentication.service');
var validator_service_1 = require('./validator/validator.service');
var edit_employee_service_1 = require('./edit-employee-profile/edit-employee-service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                button_1.MdButtonModule,
                card_1.MdCardModule,
                input_1.MdInputModule,
                icon_1.MdIconModule,
                toolbar_1.MdToolbarModule,
                sidenav_1.MdSidenavModule,
                angular2_select_1.SelectModule,
                ng2_toastr_1.ToastModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                signin_component_1.SignInComponent,
                signup_component_1.SignUpComponent,
                edit_profile_component_1.EditProfileComponent,
                recover_password_component_1.RecoverPasswordComponent,
                procedure_component_1.ProcedureComponent,
                field_detail_component_1.FieldDetailComponent,
                inbox_component_1.InboxTramiteComponent,
                inbox_component_2.InboxSolicitudComponent,
                editTramite_component_1.EditTramite,
                editSolicitud_component_1.EditSolicitud,
                inbox_component_3.InboxUsuarioComponent,
                create_procedure_component_1.CreateProcedureComponent,
                survey_component_1.Survey,
                signup_employee_component_1.SignUpEmployeeComponent,
                edit_employee_profile_component_1.EditEmployeeProfileComponent
            ],
            providers: [
                authentication_service_1.AuthenticationService,
                validator_service_1.ValidatorService,
                edit_employee_service_1.EditEmployeeService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map