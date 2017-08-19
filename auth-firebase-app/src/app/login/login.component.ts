import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Initiates login through Google
  loginGoogle() {
    console.log("Logging in through Google");
    this.auth.loginWithGoogle()
      .then((success) => {
        console.log("Successfully logged in");
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log("Error logging in");
        alert("Error. Error message: " + error);
      });
  }

  // Initiates login through Facebook
  loginFacebook() {
    console.log("Logging in through Facebook");
    this.auth.loginWithFacebook()
      .then((success) => {
        console.log("Successfully logged in");
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log("Error logging in");
        alert("Error. Error message: " + error);
      });
  }

}
