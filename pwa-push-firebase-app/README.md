# Progressive Web Push Firebase App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1. This project illustrates the implementation of push notifications for all platforms using Firebase Cloud Messaging system along with its database and server.

## Setup

Utilize the following commands to setup the app and run the code.
1. <b>npm install:</b> Installs all the node modules required
2. Create up a new project through your account on https://console.firebase.google.com
3. Procure the server key from <b>Settings > Cloud Messaging > Server Key</b> in your custom project
4. Provide the key in the <b>push.service.ts</b> file provided to trigger a push
5. <b>ng serve:</b> Run the project on development server

To run the code on a build-similar server, we use live-server. Post step 4, follow the below commands to implement so.
1. <b>ng build:</b> Builds a dist folder in the root directory that contains all the bundled files
2. <b>npm run static-serve:</b> Runs the live-server to run the build files on server

## Notes

1. In this particular project, we are triggering the push from the client-side. This is not advisable since it
exposes the server key which should normally be hidden from the users i.e. a le data abstraction implementation. To achieve this, we provide the post operation being called in the PushService created in our node server or any other similar server used for backend operations.
2. While testing out data-retrieval from firebase database using <b>FirebaseListObservable</b> a delay was encountered. It is speculated that this delay was incurred due to flaky and variable network connection and so we have used a <b>setTimeout()</b> function with a 6500 ms delay to obtain all the data before proceeding with a push operation. One is strongly encouraged to check the delay incurred on one's network and configure/remove the added function as per convenience.

## Steps To Integrate

Token Generation, Firebase Database Operation and Token Duplication Check

1. Install <b>AngularFire2</b> and <b>Firebase</b> library to connect to Firebase and make use of its Cloud Messaging APIs
    <pre>npm install angularfire2 firebase --save</pre>

2. Create a <b>firebase-messaging-sw.js</b> file called the Firebase Service Worker in the <b>/src</b> directory and add the code as is mentioned
3. In <b>.angular-cli.json</b> file in the root directory, add the <b>firebase-messaging-sw.js</b> to the assets array
    <pre>
     "assets": [
        "assets",
        "favicon.ico",
        "firebase-messaging-sw.js"
      ],
    </pre>

4. In <b>tsconfig.json</b> add a types array with firebase as an element
    <pre>
     "types":[
      "firebase"
    ]
    </pre>

5. Create a manifest.json file in the <b>/src</b> directory and add the browser sender ID as is provided
    <pre>
    {
        "name": "PWA-Push-Firebase-App",
        "gcm_sender_id": "103953800507"
    }
    </pre>

6. Include a call to the manifest.json in index.html to register the manifest with the app
7. Create a <b>firebase.config.ts</b> file in the /src/environments/ directory and populate the keys mentioned with your respective project configuration values
    <pre>
    export const firebaseConfig = {
        apiKey: '<API Key>',
        authDomain: 'my-pwa-first-notification.firebaseapp.com',
        databaseURL: 'https://my-pwa-first-notification.firebaseio.com',
        projectId: 'my-pwa-first-notification',
        storageBucket: 'my-pwa-first-notification.appspot.com',
        messagingSenderId: "1019013830321"
    }
    </pre>

8. Call the <b>firebase.config.ts</b> in <b>app.module.ts</b> accordingly and initialize the firebase app
    <pre>
    import { AngularFireModule } from 'angularfire2';
    import * as firebase from 'firebase';
    import { firebaseConfig } from './../environments/firebase.config';
    import { AngularFireDatabaseModule } from 'angularfire2/database';
    ...
    firebase.initializeApp(firebaseConfig);
    ...
    @NgModule({
        ...
        imports: [
            ...
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireDatabaseModule
        ],
        ...
    })
    </pre>

9. In <b>app.component.ts</b> we call the messaging API of firebase through the <b>AngularFire2</b> library
    <pre>
    import * as firebase from 'firebase';
    import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
    ...
    messaging:any
    ...
    export class AppComponent implements OnInit {
        ...
        constructor(...) {
            this.messaging = firebase.messaging();
        }
    } 
    </pre>

10. Now we call the separate functions for token ID instance generation, duplication check and firebase database operations

    <b>Check for Token Refresh (Add to constructor())</b>
    <pre>
    this.messaging.onTokenRefresh(function () {
      this.messaging.getToken()
        .then(function (refreshedToken) {
          console.log('Token refreshed.');
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });
    </pre>

    <b>Obtaining Firebase Data and extracting to an Array (Add to constructor())</b>
    <pre>
    this.itemsArr = []  // Reinitialize the array to prevent data duplication
    this.items = this.db.list('/items', { preserveSnapshot: true });
    this.items.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.val().tokenID);
        this.itemsArr.push(snapshot.val().tokenID);
      });
    });
    </pre>

    <b>Check for Existing Tokens (Add to AppComponent class)</b>
    <pre>
    checkToken(token, arr) {
        let counter: number = 0
        for (var i = 0; i < arr.length; i++) {
        if (arr[i] === token) {
                counter++
            }
        }
        console.log("Counter value", counter)
        return counter
    }
    </pre>

    <b>Request for Permission, Token Fetch, Check and Store (Add to ngOnInit())</b>
    <pre>
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
    </pre>

    <b>Handle Incoming Messages and Payload (Add to ngOnInit())</b>
    <pre>
    this.messaging.onMessage(function (payload) {
      console.log("Message received. ", payload);
    });
    </pre>

Push Generation

1. Create a Push Service file namely <b>push.service.ts</b> or any other file of your choice name
2. Call the service as a provider in the main app module
3. Create a notification object in <b>app.component.ts</b> as follows
    <pre>
    pushData: any = {
    'notification': {
        "title": "Background Message Title",
        "body": "Background Message Body"
        },
        "to": ""
    }
    </pre>

4. Create a function to send data to the push trigger in <b>push.service.ts</b> in <b>app.component.ts</b>
    <pre>
    generatePush() {
        if (this.pushData.to === "") {
        console.log("No token available")
        return
        }
        this.pushService.generatePush(this.pushData)
        .subscribe(data => { console.log("Succesfully Posted") }, err => console.log(err))
    }
    </pre>

5. Make a call to the default http service provided by Angular and hit the concerned firebase API to trigger a push in <b>push.service.ts</b> and add your respective server key as mentioned already
    <pre>
    generatePush(pushData) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'key=<firebase server key>'})
    let options = new RequestOptions({ headers: headers })
    return this.http.post('https://fcm.googleapis.com/fcm/send', pushData, options)
        .map(data => {console.log("Successfully Sent")})
    }
    </pre>

Hurrah. You can see the payload being generated in your browser console, thereby, affirming that the notification has been sent.

We are triggering a push to our current token and the notifications will come up only if you are not active on the webpage while triggering it. So to view the trigger operation, you can make use of the following curl command as well in your git bash or any other consequent terminal.
    <pre>curl -H "Content-Type: application/json" -H "Authorization: key=<add your server key>" -X POST -d '{"notification": {"title": "Background Message Title", "body": "Background Message Body"}, "to": "<add token of device to send the push notification to>"}' https://fcm.googleapis.com/fcm/send</pre>

## Further help

You can raise an issue for any query you have pertaining to any part of its implementation.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
