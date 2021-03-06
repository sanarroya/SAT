import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SignInComponent} from './signin/signin.component';
import {SignUpComponent} from './signup/signup.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import {ProcedureComponent} from "./procedure/procedure.component";
import {FieldDetailComponent} from "./field-detail/field-detail.component";
import {InboxTramiteComponent} from './tramite/inbox.component';
import {EditTramite} from './edit-tramite/editTramite.component';
import {InboxSolicitudComponent} from './solicitud/inbox.component';
import {EditSolicitud} from './edit-solicitud/editSolicitud.component';
import {InboxUsuarioComponent} from './usuario/inbox.component';
import {CreateProcedureComponent} from './create-procedure/create-procedure.component'
import {SignUpEmployeeComponent} from './signup-employee/signup-employee.component';
import {EditEmployeeProfileComponent} from './edit-employee-profile/edit-employee-profile.component'

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/signin',
        pathMatch: 'full'
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'editProfile',
        component: EditProfileComponent
    },
    {
        path: 'recoverPassword',
        component: RecoverPasswordComponent
    },
    {
        path: 'procedure',
        component: ProcedureComponent
    },
    {
        path: 'fieldDetail',
        component: FieldDetailComponent
    },
    {

        path: 'inboxTramite',
        component: InboxTramiteComponent
    },
    {
        path: 'editTramite/:idTramite',
        component: EditTramite
    },
    {
        path: 'inboxSolicitud',
        component: InboxSolicitudComponent
    },
    {
        path: 'editSolicitud/:idSolicitud',
        component: EditSolicitud
    },
    {
        path: 'inboxUsuario',
        component: InboxUsuarioComponent
    },
    {
        path: 'signUpEmployee',
        component: SignUpEmployeeComponent
    },
    {
        path: 'editEmployee/:employeeId',
        component: EditEmployeeProfileComponent
    },
    {
        path: 'createProcedure',
        component: CreateProcedureComponent
    }
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);