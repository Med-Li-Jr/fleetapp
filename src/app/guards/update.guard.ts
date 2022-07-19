import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean |UrlTree 
    
  {
    let isLoggedIn = this.loginService.isAuthenticated();
    let canUpdate = this.loginService.canUpdate(route.data["moduleName"]);

    if (isLoggedIn){
      
      if(canUpdate)
        return true
      else
        return this.router.parseUrl('/notallowed');

    } else {

      this.router.navigate(['/login']);
      return false

    }
  }
  
}
