import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadminGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean |UrlTree 
    
  {
    if(this.loginService.currentUser == null)
      return false;

    let isLoggedIn = this.loginService.isAuthenticated();
    let isSuperAdmin = this.loginService.currentUser.isSuperAdmin;

    if (isLoggedIn){
      
      if(isSuperAdmin)
        return true
      else
        return this.router.parseUrl('/notallowed');

    } else {

      this.router.navigate(['/login']);
      return false

    }
  }
  
}
