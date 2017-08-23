import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      console.log(user);
      this.currentUser = user; 
    });
  }

  // Returns the current state
  getAuthState() {
    return this.authState;
  }

  // Returns the current value of the logged in user
  getCurrentUser() {
    console.log(this.currentUser);
    return this.currentUser;
  }

  // Create new user registration
  createUser(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // To enable login through google account
  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }

  // To enable login through facebook account
  loginWithFacebook() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider());
  }

  // To enable login through saved email account
  loginWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // To enable sign out from the app
  signOut() {
    return this.afAuth.auth.signOut();
  }
}
