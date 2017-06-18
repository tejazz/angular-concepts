import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Providers
import { PushService } from './push.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // Declare the variables used
  messaging: any
  token: any  // Stores the current token ID instance generated
  items: FirebaseListObservable<any[]>
  itemsDisplay: FirebaseListObservable<any[]> // List observable for template view (Optional. items itself can be used)
  itemsArr: any[] // Stores the token IDs retrieved from the firebase database 
  hideToken: boolean = false

  // Notificayion object
  pushData: any = {
    'notification': {
      "title": "Background Message Title",
      "body": "Background Message Body"
    },
    "to": ""
  }

  constructor(public db: AngularFireDatabase, private pushService: PushService) {

    // Creates a Firebase List Observable and calls the data in it
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

    // Obtaining the firebase data and retrieving token ID values separately
    this.itemsArr = []  // Reinitialize the array to prevent data duplication
    this.items = this.db.list('/items', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.val().tokenID);
        this.itemsArr.push(snapshot.val().tokenID);
      });
    });
    // console.log(this.itemsArr)

  }

  // Check for duplicates in token subscription
  checkToken(token, arr) {
    console.log("Inside check token function")
    console.log(arr)
    console.log(token)
    let counter: number = 0
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === token) {
        counter++
      }
    }
    console.log("Counter value", counter)
    return counter
  }

  // Generate Push through an event
  generatePush() {
    console.log("Inside push function")
    console.log(this.pushData.to)
    if (this.pushData.to === "") {
      console.log("No token available")
      return
    }
    this.pushService.generatePush(this.pushData)
      .subscribe(data => { console.log("Succesfully Posted") }, err => console.log(err))
  }

  // Function to get the data from Firebase Database
  getDataFromFb() {
    this.hideToken = true
  }

  ngOnInit() {
    // Prompt user to grant permission for notifications on loading components
    const self = this
    this.items = this.db.list('/items')
    this.messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
        self.messaging.getToken()
          .then(function (currentToken) {
            if (currentToken) {
              self.token = currentToken
              self.pushData.to = self.token
              console.log(self.pushData.to)

              // Set a timeout so as to enable all the data to be loaded
              setTimeout(() => {
                if (self.checkToken(self.token, self.itemsArr) === 0) {
                  console.log("Push occurrence")
                  self.items.push({ tokenID: currentToken })
                } else {
                  console.log("User is already subscribed")
                }
              }, 6500)
              // Displays the current token data
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
