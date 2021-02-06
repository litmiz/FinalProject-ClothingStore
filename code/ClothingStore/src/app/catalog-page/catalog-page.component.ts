import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {
  category
  itemType;
  type;
  items = [];
  @Output() mainMenuChoice = new EventEmitter();
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      console.log('params', params);
      this.getCatalog();
    });
  }

  // ngOnChanges(changes: any) {
  //   if (changes.category) {
  //     console.log(this.category);
  //     this.getCatalog();
  //   }
  // }

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
