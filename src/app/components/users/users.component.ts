import { Component, OnInit } from '@angular/core';
import { UserRead } from '../../modals/user.modal';
import { MyhelperService } from '../../services/myhelper.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserRead[] = [];
  
  constructor(private helperService: MyhelperService, private userService: UsersService) { }


  ngOnInit(): void {
    this.onGetAllUser();
  }

  onGetAllUser()  {
    this.helperService.setLocationMenu("Users", "Dashboard")
    this.helperService.setIsLoading(true);

    this.userService.getAllUsers()
    .subscribe(      
      resp => {
        this.users = resp;
        this.helperService.setIsLoading(false);

      },
      error => {
        this.helperService.showErrorToast(error)
      },

    )
  }
}
