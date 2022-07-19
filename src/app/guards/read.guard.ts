import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ReadGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean |UrlTree 
    
  {
    let isLoggedIn = this.loginService.isAuthenticated();
    let canRead = this.loginService.canRead(route.data["moduleName"]);

    if (isLoggedIn){
      
      if(canRead)
        return true
      else
        return this.router.parseUrl('/notallowed');

    } else {

      this.router.navigate(['/login']);
      return false

    }
  }
  
}
