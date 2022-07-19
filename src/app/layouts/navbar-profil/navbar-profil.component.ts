import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MyhelperService } from '../../services/myhelper.service';

@Component({
  selector: 'app-navbar-profil',
  templateUrl: './navbar-profil.component.html',
  styleUrls: ['./navbar-profil.component.css']
})
export class NavbarProfilComponent implements OnInit {

  currentUser: any;
  constructor(private router: Router, private loginService: LoginService, private helperService: MyhelperService ) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.getCurrentUser();
  }
  onLogout() 
  {
    this.loginService.logout()
    location.href = "login"
    // this.router.navigate(['login']);
  }

  onResetData()
  {
    this.helperService.resetData();
    this.onLogout() 
  }
}
