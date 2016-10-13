"use strict";
var router_1 = require('@angular/router');
var heroes_component_1 = require('./heroes.component');
var signin_component_1 = require('./signin/signin.component');
var signup_component_1 = require('./signup/signup.component');
var edit_profile_component_1 = require('./edit-profile/edit-profile.component');
var recover_password_component_1 = require('./recover-password/recover-password.component');
var inbox_component_1 = require('./tramite/inbox.component');
var editTramite_component_1 = require('./edit-tramite/editTramite.component');
var inbox_component_2 = require('./solicitud/inbox.component');
var editSolicitud_component_1 = require('./edit-solicitud/editSolicitud.component');
var inbox_component_3 = require('./usuario/inbox.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/signin',
        pathMatch: 'full'
    },
    {
        path: 'heroes',
        component: heroes_component_1.HeroesComponent
    },
    {
        path: 'signin',
        component: signin_component_1.SignInComponent
    },
    {
        path: 'signup',
        component: signup_component_1.SignUpComponent
    },
    {
        path: 'editProfile',
        component: edit_profile_component_1.EditProfileComponent
    },
    {
        path: 'recoverPassword',
        component: recover_password_component_1.RecoverPasswordComponent
    },
    {
        path: 'inboxTramite',
        component: inbox_component_1.InboxTramiteComponent
    },
    {
        path: 'editTramite/:idTramite',
        component: editTramite_component_1.EditTramite
    },
    {
        path: 'inboxSolicitud',
        component: inbox_component_2.InboxSolicitudComponent
    },
    {
        path: 'editSolicitud/:idSolicitud',
        component: editSolicitud_component_1.EditSolicitud
    },
    {
        path: 'inboxUsuario',
        component: inbox_component_3.InboxUsuarioComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map