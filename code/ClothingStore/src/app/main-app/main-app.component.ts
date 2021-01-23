import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  userChoice:string = "about-us";
  bgImage:string = "aboutusBG1.jpg";
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  chooseFromMenu(choice:string){
    this.userChoice = choice;
    if (choice != "about-us") {
      this.bgImage = "BG2.jpg";
    } else {
      this.bgImage = "aboutusBG1.jpg";
    }
    this.renderer.setStyle(document.body, 'background', `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(../../assets/${this.bgImage})`);
  }

}
