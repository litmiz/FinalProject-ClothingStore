import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {
  @Input() itemCatalogData;
  img;
  price;
  oldPrice;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes:any){
    if(changes.itemCatalogData){
      console.log(changes.itemCatalogData);
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
