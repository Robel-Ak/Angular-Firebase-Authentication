import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authenticationService: AuthService, public router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let isLoggedIn = this.authenticationService.isAuthenticated();
      let principle = this.authenticationService.getAuthenticatedPrinciple();
    if (principle && principle['isLoggedIn'] == true && (principle['role'] == 'user' || principle['role'] == 'Admin' )){
      return true;
    } else {
      window.alert("Failed to signin and try again!!")
      this.router.navigate(['/signin']);
    }
    return true;
  }
  
}
