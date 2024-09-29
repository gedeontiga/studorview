import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JobEstablishmentComponent } from './job-establishment/job-establishment.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotesreportFormComponent } from './notesreport-form/notesreport-form.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './user-profil/register-form/register-form.component';
import { LoginFormComponent } from './user-profil/login-form/login-form.component';
// import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TypewriterDirective } from './typewriter.directive';
import { PersonalInfoComponent } from './user-profil/register-form/personal-info/personal-info.component';
import { AccountInfoComponent } from './user-profil/register-form/account-info/account-info.component';
import { ActivationComponent } from './user-profil/register-form/activation/activation.component';
import { UserProfilComponent } from './user-profil/user-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobEstablishmentComponent,
    NavbarComponent,
    NotesreportFormComponent,
    RegisterFormComponent,
    LoginFormComponent,
    TypewriterDirective,
    PersonalInfoComponent,
    AccountInfoComponent,
    ActivationComponent,
    UserProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatIconModule
  ],
  providers: [provideHttpClient(withFetch()), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
