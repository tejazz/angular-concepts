import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // Declare the variables used
  messaging: any
  token: any
  items: FirebaseListObservable<any[]>
  itemsDisplay: FirebaseListObservable<any[]>
  itemsArr: any = []
  hideToken: boolean = false

  constructor(public db: AngularFireDatabase) {

    this.itemsDisplay = db.list('/items')

    // Declaring the property value of messaging
    this.messaging = firebase.messaging();

    // Check for token refresh
    this.messaging.onTokenRefresh(function () {
      this.messaging.getToken()
        .then(function (refreshedToken) {
          console.log('Token refreshed.');
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });
  }

  // Function to display the token IDs
  showToken() {
    const self = this
    this.items = this.db.list('/items')
    // Get Instance ID token. Initially this makes a network call, once retrieved subsequent calls to getToken will return from cache.
    this.messaging.getToken()
      .then(function (currentToken) {
        if (currentToken) {
          self.token = currentToken
          if (self.checkToken(self.token) === 0) {
            self.items.push({ tokenID: currentToken })
          } else {
            console.log("User is already subscribed")
          }
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

  // Check for duplicates in token subscription
  checkToken(token) {
    console.log("Inside check token function")
    let counter: number = 0
    for (var i = 0; i < this.itemsArr.length; i++) {
      if (this.itemsArr[i] == token) {
        counter++
      }
    }
    console.log("Counter value", counter)
    return counter
  }

  // Function to get the data from Firebase Database
  getDataFromFb() {
    this.hideToken = true
    this.itemsArr = []
    console.log("Inside get data functions")
    this.items = this.db.list('/items', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.val().tokenID);
        this.itemsArr.push(snapshot.val().tokenID);
      });
    });

    console.log(this.itemsArr)
    // this.items.forEach(element => {
    //   this.itemsArr.push(element)
    // });
  }


  ngOnInit() {
    // Prompt user to grant permission for notifications on loading components
    const self = this
    this.messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify. ', err);
      })

    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a sevice worker `messaging.setBackgroundMessageHandler` handler.
    this.messaging.onMessage(function (payload) {
      console.log("Message received. ", payload);
    });
  }

}
