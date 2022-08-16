import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  getScreenWidth: any;
  getScreenHeight: any;

  arrayScriptsJS: string[] = [
    "assets/vendor/libs/jquery/jquery.js",
    "assets/vendor/libs/popper/popper.js",
    "assets/vendor/js/bootstrap.js",
    "assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js",
    "assets/vendor/js/menu.js",
    "assets/js/mymain.js",
    "assets/js/ui-toasts.js",
    "https://buttons.github.io/buttons.js",
  ];

  constructor(
    private router: Router,
    private titleService: Title) {
    this.loadScript();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`Fleet App - ${title}`);
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
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
