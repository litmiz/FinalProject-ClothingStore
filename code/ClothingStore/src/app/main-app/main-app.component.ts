import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  userChoice:string = "about-us";
  constructor() { }

  ngOnInit(): void {
  }

  chooseFromMenu(choice:string){
    this.userChoice = choice;
  }

}
