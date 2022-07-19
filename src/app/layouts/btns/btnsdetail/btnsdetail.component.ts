import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-btnsdetail',
  templateUrl: './btnsdetail.component.html',
  styleUrls: ['./btnsdetail.component.css']
})
export class BtnsdetailComponent implements OnInit {

  @Output()
  btnDeleteClicked: EventEmitter<any> = new EventEmitter<any>()

  @Input() moduleName: string;
  @Input() itemId: string;

  canUpdate : boolean = false;
  canDelete : boolean = false;
  constructor(private loginService: LoginService) { }
  
  ngOnInit(): void {

    this.canUpdate = this.loginService.canUpdate(this.moduleName);
    this.canDelete = this.loginService.canDelete(this.moduleName);
  }
  onDelete()
  {    
    this.btnDeleteClicked.emit("");
  }
}
