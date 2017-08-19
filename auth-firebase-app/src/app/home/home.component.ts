import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: firebase.User;
  loggedOut: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe((user) => {
      this.user = user;
    })
  }

  // Initiates sign out operation from the app
  signOut() {
    console.log("Signing out");
    this.auth.signOut()
      .then((success) => {
        console.log("Successfully logged out");
        this.loggedOut = true;
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log("Error logging out.");
        alert("Error. Error message: " + error);
      });
  }
}
