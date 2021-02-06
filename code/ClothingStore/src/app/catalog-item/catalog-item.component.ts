import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {
  @Input() itemCatalogData;
  _id;
  img;
  price;
  oldPrice;

  constructor() { }
  ngOnInit(): void {
  }

  ngOnChanges(changes:any){
    if(changes.itemCatalogData){
      this._id = `item-page-${this.itemCatalogData._id}`;
      this.img = `${environment.serverUrl}/${this.itemCatalogData.images[0]}`;
      this.price = `${this.itemCatalogData.price}$`;
      if (this.itemCatalogData.sale) {
        this.oldPrice = `${this.itemCatalogData.oldPrice}$`;
      } else {
        this.oldPrice = ``;
      }
    }
  }
}
