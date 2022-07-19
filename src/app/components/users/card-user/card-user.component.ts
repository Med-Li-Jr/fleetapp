import { Component, Input, OnInit } from '@angular/core';
import { UserRead } from '../../../modals/user.modal';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {

  canRead = false;
  isExist : boolean = false;

  @Input()
  currentUser: UserRead;
  
  @Input()
  moduleName: string;
  
  constructor(
    private loginService: LoginService) { }

  ngOnInit(): void {
    if(this.currentUser == null || this.currentUser.id == 0)
      this.isExist = false
    else
      this.isExist = true
  
    this.canRead = this.loginService.canRead(this.moduleName)
  }

}
