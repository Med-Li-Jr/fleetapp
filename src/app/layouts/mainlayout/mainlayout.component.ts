import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})
export class MainlayoutComponent implements OnInit {

  arrayScriptsJS: string[] = [
    "assets/js/onceLoad.js",
  ];
  constructor() {}

  ngOnInit(): void {
    this.loadScript();
  }


  public loadScript() {

    for (var i = 0; i < this.arrayScriptsJS.length; i++) {
      let node = document.createElement('script');
      node.src = this.arrayScriptsJS[i];
      // node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
