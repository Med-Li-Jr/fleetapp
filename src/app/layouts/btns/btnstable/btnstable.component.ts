import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-btnstable',
  templateUrl: './btnstable.component.html',
  styleUrls: ['./btnstable.component.css']
})
export class BtnstableComponent implements OnInit {

  @Input() itemId: string;

  @Input() moduleName: string;

  canRead: boolean = false;
  canUpdate : boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.canRead = this.loginService.canRead(this.moduleName)
    this.canUpdate = this.loginService.canUpdate(this.moduleName)
  }


}
