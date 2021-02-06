import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() mainMenuChoice = new EventEmitter();
  choice = '1';
  constructor(public router: Router) { }

  chooseFromMenu(choice):void
  {
    this.mainMenuChoice.emit(choice);
    switch (choice) {
      case "home":
        this.choice = '1';
        break;
      case "about-us":
        this.choice = '2';
        break;
      case "contact-us":
        this.choice = '3';
        break;
      default: // Catalog
        this.choice = '4';
        break;
    }
  }

  ngOnInit(): void {
  }

}
