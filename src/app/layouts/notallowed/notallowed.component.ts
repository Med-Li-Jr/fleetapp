import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyhelperService } from 'src/app/services/myhelper.service';

@Component({
  selector: 'app-notallowed',
  templateUrl: './notallowed.component.html',
  styleUrls: ['./notallowed.component.css']
})
export class NotallowedComponent implements OnInit {

  constructor(private helperService: MyhelperService,private router: Router) { }

  ngOnInit(): void {
    this.helperService.setIsLoading(false)
  }
  onBack()
  {
    this.router.navigate(["/"]);
  }
}
