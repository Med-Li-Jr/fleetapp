import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CreateGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean |UrlTree 
    
  {
    let isLoggedIn = this.loginService.isAuthenticated();
    let canCreate = this.loginService.canCreate(route.data["moduleName"]);

    if (isLoggedIn){
      if(canCreate)
        return true
      else
        return this.router.parseUrl('/notallowed');

    } else {

      this.router.navigate(['/login']);
      return false

    }
  }
  
}