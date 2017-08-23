import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Function executed on submiiting the form
  onSubmit(value) {
    console.log(value);
    this.auth.loginWithEmail(value.email, value.pwd)
      .then((success) => {
        console.log("Successfully logged in with email and password");
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log("Error logging in.");
        alert("Error. Error message: " + error);
      });
  }

}
