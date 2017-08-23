import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorVal: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Function executed on submiiting the form
  onSubmit(value) {
    console.log(value);

    if(value.pwd === value.confirmPwd) {
    this.auth.createUser(value.email, value.pwd)
      .then((success) => {
        console.log("Successfully registered user");
        alert("New user has been successfully created.");
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log("Error logging out.");
        alert("Error. Error message: " + error);
      });
    }
    else {
      this.errorVal = true;
    }
  }

}
