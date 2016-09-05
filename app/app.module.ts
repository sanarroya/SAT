import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from './hero.service';
import { SignInComponent } from './signin/signin.component'
import { SignUpComponent } from './signup/signup.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { AuthenticationService } from './services/authentication.service'
import { routing } from './app.routing';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdIconModule,
    MdToolbarModule,
    routing 
  ],
  declarations: [ 
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    SignInComponent,
    SignUpComponent,
    EditProfileComponent,
    DashboardComponent 
  ],
  providers: [
    HeroService,
    AuthenticationService
  ],
  bootstrap: [ AppComponent ] 
})

export class AppModule { }

