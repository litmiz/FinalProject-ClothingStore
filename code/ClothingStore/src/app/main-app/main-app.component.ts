import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  bgImage: string = "";
  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        if (event.url == "/about-us") {
          this.bgImage = "aboutusBG1.jpg"
        } else if (event.url == "/contact-us") {
          this.bgImage = "BG5.jpg";
        } else {
          this.bgImage = "";
        }
        if (this.bgImage) {
          this.renderer.setStyle(document.body, 'background', `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(../../assets/${this.bgImage})`);
        } else {
          this.renderer.setStyle(document.body, 'background', "");
        }
      }
    });
  }
}
