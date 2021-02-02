import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  userChoice:string = "home";
  bgImage:string = "";
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  chooseFromMenu(choice:string){
    this.userChoice = choice;
    if (choice == "home" || choice == "login" || choice == "item-page" || choice == "catalog-page") {
      this.bgImage = "";
    } else if (choice == "about-us") {
      this.bgImage = "aboutusBG1.jpg"
    } else if (choice == "contact-us") {
      this.bgImage = "BG5.jpg";
    }
    if (this.bgImage) {
      this.renderer.setStyle(document.body, 'background', `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(../../assets/${this.bgImage})`);
    } else {
      this.renderer.setStyle(document.body, 'background', "");
    }
  }

}
