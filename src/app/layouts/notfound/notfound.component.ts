import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  requestedUrl : string = ''
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.requestedUrl = this.router.url.replace("/", "")
  }
  onBack()
  {
    this.router.navigate(["/"]);
  }

}
