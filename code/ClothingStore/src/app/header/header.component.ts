import { Component, OnInit,  Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() mainMenuChoice = new EventEmitter();
  constructor() { }

  chooseFromMenu(choice):void
  {
    this.mainMenuChoice.emit(choice);
  }

  ngOnInit(): void {
  }

}
