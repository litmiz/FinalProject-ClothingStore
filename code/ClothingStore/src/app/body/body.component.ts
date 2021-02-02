import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor() { }

  @Input() choice;

  ngOnChanges(changes:any){
    if(changes.choice){
      console.log(changes.choice);
    }
  }

  ngOnInit(): void {
  }

  chooseFromMenu(choice):void
  {
    console.log("body");
    this.choice = choice;
  }

}
