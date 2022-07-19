import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router){};
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean |UrlTree 
    
  {
    let isLoggedIn = this.loginService.isAuthenticated();

    if (isLoggedIn){
      return true
    } else {
      return this.router.parseUrl('/login');
    }
  }
  
}
