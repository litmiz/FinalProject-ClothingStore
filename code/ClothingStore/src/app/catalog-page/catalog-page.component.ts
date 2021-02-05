import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {
  @Input() category
  itemType;
  type;
  items = [];
  @Output() mainMenuChoice = new EventEmitter();
  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: any) {
    if (changes.category) {
      console.log(this.category);
      this.getCatalog();
    }
  }

  getCatalog(itemType=null, type=null, sortBy=null) {
    if (!sortBy) {
      this.itemType = itemType;
      this.type = type;
    }
    this.api.getCatalog(this.category, this.itemType, this.type, sortBy).subscribe(res => {
      console.log(res);
      this.items = res as [];
    })
  }

  chooseFromMenu(choice):void
  {
    console.log("page");
    this.mainMenuChoice.emit(choice);
  }

}
