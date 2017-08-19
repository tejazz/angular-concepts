import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // Obtaining the current authentication state user value
    this.auth.getAuthState().subscribe((user) => {
      this.user = user;
      console.log(`User value `,this.user);
    });
  }
}
