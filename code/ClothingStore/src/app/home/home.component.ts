import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() mainMenuChoice = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  chooseFromMenu(choice):void
  {
    console.log("home");
    this.mainMenuChoice.emit(choice);
  }
}
