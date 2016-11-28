//Angular 2 imports
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {MdButtonModule} from '@angular2-material/button'
import {MdIconModule} from '@angular2-material/icon'
import {MdCardModule} from '@angular2-material/card'
import {MdInputModule} from '@angular2-material/input'
import {MdToolbarModule} from '@angular2-material/toolbar'
import {MdSidenavModule} from '@angular2-material/sidenav'
import {SelectModule} from 'angular2-select'
import {ToastModule} from 'ng2-toastr/ng2-toastr'

//SAT - Components
import {AppComponent} from './app.component'
import {routing} from './app.routing'

//Authentication
import {SignInComponent} from './signin/signin.component'
import {SignUpComponent} from './signup/signup.component'
import {RecoverPasswordComponent} from './recover-password/recover-password.component'

//Edit profile
import {EditProfileComponent} from './edit-profile/edit-profile.component'

//Procedures
import {InboxTramiteComponent} from './tramite/inbox.component'
import {ProcedureComponent} from './procedure/procedure.component'
import {EditTramite} from './edit-tramite/editTramite.component'
import {FieldDetailComponent} from './field-detail/field-detail.component'

//Procedure request
import {InboxSolicitudComponent} from './solicitud/inbox.component'
import {EditSolicitud} from './edit-solicitud/editSolicitud.component'
import {CreateProcedureComponent} from './create-procedure/create-procedure.component'
import {Survey} from './create-procedure/survey.component'

//Employee management
import {InboxUsuarioComponent} from './usuario/inbox.component'
import {SignUpEmployeeComponent} from './signup-employee/signup-employee.component'
import {EditEmployeeProfileComponent} from './edit-employee-profile/edit-employee-profile.component'

//SAT - Services
import {AuthenticationService} from './services/authentication.service'
import {ValidatorService} from './validator/validator.service'
import {EditEmployeeService} from './edit-employee-profile/edit-employee-service'
import {CreateProcedureService} from './create-procedure/create-procedure.service'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MdButtonModule,
        MdCardModule,
        MdInputModule,
        MdIconModule,
        MdToolbarModule,
        MdSidenavModule,
        SelectModule,
        ToastModule,
        routing
    ],
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        EditProfileComponent,
        RecoverPasswordComponent,
        ProcedureComponent,
        FieldDetailComponent,
        InboxTramiteComponent,
        InboxSolicitudComponent,
        EditTramite,
        EditSolicitud,
        InboxUsuarioComponent,
        CreateProcedureComponent,
        Survey,
        SignUpEmployeeComponent,
        EditEmployeeProfileComponent
    ],
    providers: [
        AuthenticationService,
        ValidatorService,
        EditEmployeeService,
        CreateProcedureService
    ],
    bootstrap: [AppComponent]
    
})

export class AppModule {
}

