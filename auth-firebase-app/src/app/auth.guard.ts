import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Checks whether the user is already logged in or not
    if(this.auth.getCurrentUser()) {
      console.log("Auth guard inactive");
      return true;
    }
    else {
      console.log("Auth guard active");
      this.router.navigate(['login']);
      return false;
    }
  }
}
