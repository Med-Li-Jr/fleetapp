import { Component, Input, OnInit } from '@angular/core';
import { VignetteRead } from '../../../modals/vignette.modal';

@Component({
  selector: 'app-list-vignette',
  templateUrl: './list-vignette.component.html',
  styleUrls: ['./list-vignette.component.css']
})
export class ListVignetteComponent implements OnInit {

  @Input()
  vignettes: VignetteRead[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
