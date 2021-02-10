import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  shoppingBag = [];
  items = [];
  checkout: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getShoppingBag();
  }

  getShoppingBag() {
    this.api.getShoppingBag().subscribe(res => {
      console.log(res);
      this.shoppingBag = res as [];
      this.items = [];
      if (this.shoppingBag["items"]) {
        for (let i = 0; i < this.shoppingBag["items"].length; i++) {
          this.items.push({
            image: `${environment.serverUrl}/${this.shoppingBag["images"][i]}`,
            price: this.shoppingBag["prices"][i],
            size: Object.values(this.shoppingBag["items"][i])[0],
            _id: Object.keys(this.shoppingBag["items"][i])[0],
          });
        }
      }
    });
  }

  deleteItem(item) {
    this.api.removeFromShoppingBag(item._id, item.size).subscribe(res => {
      this.getShoppingBag();
    });
  }

}
