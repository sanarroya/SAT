import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { HeroDetailComponent } from './hero-detail.component';
import { InboxTramiteComponent } from './tramite/inbox.component';
import { EditTramite } from './edit-tramite/editTramite.component';



const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/signin',
        pathMatch: 'full'
    },
    {
        path: 'heroes',
        component: HeroesComponent
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
        path: 'inboxTramite',
        component: InboxTramiteComponent
    },
    {
        path: 'editTramite/:idTramite',
        component: EditTramite
    }


    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);