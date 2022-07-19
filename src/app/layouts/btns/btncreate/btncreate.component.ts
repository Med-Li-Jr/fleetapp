import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-btncreate',
  templateUrl: './btncreate.component.html',
  styleUrls: ['./btncreate.component.css']
})
export class BtncreateComponent implements OnInit {

  @Input() moduleName: string;
  canCreate : boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.canCreate = this.loginService.canCreate(this.moduleName);
  }

}
