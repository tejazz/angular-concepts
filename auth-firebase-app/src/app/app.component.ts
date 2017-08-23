import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = null;

  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    // Obtaining the current authentication state user value
    this.auth.getAuthState().subscribe((user) => {
      this.user = user;
      console.log(`User value `,this.user);
    });
  }
}
