import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyhelperService } from 'src/app/services/myhelper.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  requestedUrl : string = ''
  
  constructor(private helperService: MyhelperService,private router: Router) { }

  ngOnInit(): void {
    this.helperService.setIsLoading(false)
    this.requestedUrl = this.router.url.replace("/", "")
  }
  onBack()
  {
    this.router.navigate(["/"]);
  }

}
