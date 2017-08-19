import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from "./app.routing";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

export function checkState(component: HomeComponent) {
  if(component.loggedOut) {
    return true;
  }
  else {
    return false;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
    {
      provide: 'checkValue',
      useValue: checkState
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


