import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdButtonModule} from '@angular2-material/button';
import {MdIconModule} from '@angular2-material/icon';
import {MdCardModule} from '@angular2-material/card';
import {MdInputModule} from '@angular2-material/input';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {SelectModule} from 'angular2-select';
import {ToastModule} from 'ng2-toastr/ng2-toastr';


import {AppComponent} from './app.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroesComponent} from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import {HeroService} from './hero.service';
import {SignInComponent} from './signin/signin.component'
import {SignUpComponent} from './signup/signup.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import {ProcedureComponent} from './procedure/procedure.component';
import {FieldDetailComponent} from './field-detail/field-detail.component';
import {InboxTramiteComponent} from './tramite/inbox.component';
import {EditTramite} from './edit-tramite/editTramite.component';
import {InboxSolicitudComponent} from './solicitud/inbox.component';
import {EditSolicitud} from './edit-solicitud/editSolicitud.component';
import {InboxUsuarioComponent} from './usuario/inbox.component';
import {CreateProcedureComponent} from './create-procedure/create-procedure.component'
import {SignUpEmployeeComponent} from './signupemployee/signup.component'
import { Survey } from './create-procedure/survey.component'
import {AuthenticationService} from './services/authentication.service'
import {routing} from './app.routing';
import { ValidatorService } from './validator/validator.service'


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
        HeroDetailComponent,
        HeroesComponent,
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
        DashboardComponent,
        SignUpEmployeeComponent
    ],
    providers: [
        HeroService,
        AuthenticationService,
        ValidatorService
    ],
    bootstrap: [AppComponent]
    
})

export class AppModule {
}

