import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {
  @Input() category
  items = [];
  @Output() mainMenuChoice = new EventEmitter();
  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: any) {
    if (changes.category) {
      console.log(this.category);
      this.api.getCatalog(this.category).subscribe(res => {
        console.log(res);
        for (let i = 0; i < 5; i++) {
          this.items.push(res[i]);
        }
      })
    }
  }

  chooseFromMenu(choice):void
  {
    console.log("preview");
    this.mainMenuChoice.emit(choice);
  }

}
