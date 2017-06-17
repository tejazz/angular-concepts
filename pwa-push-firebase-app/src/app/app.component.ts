import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // Declare the variables used
  messaging: any
  token: any

  constructor() { 
    // Declaring the property value of messaging
    this.messaging = firebase.messaging();
  }

  ngOnInit() {
    // Prompt user to grant permission for notifications on loading components
    const self = this;
    this.messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify. ', err);
      });

    this.messaging.onTokenRefresh(function () {
      this.messaging.getToken()
        .then(function (refreshedToken) {
          console.log('Token refreshed.');
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a sevice worker `messaging.setBackgroundMessageHandler` handler.
    this.messaging.onMessage(function (payload) {
      console.log("Message received. ", payload);
    });
  }

  showToken() {
    const self = this
    // Get Instance ID token. Initially this makes a network call, once retrieved subsequent calls to getToken will return from cache.
    this.messaging.getToken()
      .then(function (currentToken) {
        if (currentToken) {
          self.token = currentToken
          console.log("currentToken: ", currentToken);
          console.log("Stored token: ", self.token);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
        }
      })
      .catch(function (err) {
        console.log('An error occurred while retrieving token.', err);
      });
  }

}
