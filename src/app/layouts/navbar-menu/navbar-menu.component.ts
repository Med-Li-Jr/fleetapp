import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {


  allMenu: string[] = []
  isCurrentUserAdmin : boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.isCurrentUserAdmin = this.loginService.currentUser.isSuperAdmin;
    this.loginService.currentUser.allPrivileges.forEach(element => {
      if(element.canRead)
        this.allMenu.push(element.moduleName);
      
    });
  }
}
