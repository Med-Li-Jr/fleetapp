import { Component, Input, OnInit } from '@angular/core';
import { UserRead } from '../../../modals/user.modal';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  @Input()
  users: UserRead[] = [];
  @Input()
  moduleName: string = "";

  ngOnInit(): void {
  }

}
