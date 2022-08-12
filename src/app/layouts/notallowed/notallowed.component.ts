import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notallowed',
  templateUrl: './notallowed.component.html',
  styleUrls: ['./notallowed.component.css']
})
export class NotallowedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onBack()
  {
    this.router.navigate(["/"]);
  }
}
