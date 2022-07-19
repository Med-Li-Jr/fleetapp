import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MyhelperService } from '../../services/myhelper.service';

@Component({
  selector: 'app-datareset',
  templateUrl: './datareset.component.html',
  styleUrls: ['./datareset.component.css']
})
export class DataresetComponent implements OnInit {

  constructor(private loginService: LoginService, private helperService: MyhelperService, private router: Router) { }

  ngOnInit(): void {
    this.helperService.resetData();
    this.loginService.logout()
    this.router.navigate(['login']);
  }

}
