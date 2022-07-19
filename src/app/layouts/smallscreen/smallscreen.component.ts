import { Component, OnInit } from '@angular/core';
import { MyhelperService } from 'src/app/services/myhelper.service';

@Component({
  selector: 'app-smallscreen',
  templateUrl: './smallscreen.component.html',
  styleUrls: ['./smallscreen.component.css']
})
export class SmallscreenComponent implements OnInit {

  constructor(private helperService: MyhelperService) { }

  ngOnInit(): void {
    this.helperService.setIsLoading(false)
  }

}
