import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
import { AppComponent } from './app.component';

// Firebase Web App Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6Vk_x7V3EycReVZoWARz9JtPM2ArWSXA',
  authDomain: 'my-pwa-first-notification.firebaseapp.com',
  databaseURL: 'https://my-pwa-first-notification.firebaseio.com',
  projectId: 'my-pwa-first-notification',
  storageBucket: 'my-pwa-first-notification.appspot.com',
  messagingSenderId: '1019013830321'
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
