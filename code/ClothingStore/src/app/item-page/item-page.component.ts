import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  private _success = new Subject<string>();
  item = {};
  images: GalleryItem[];
  sizeDesc = {};
  activeDesc = false;
  _id;
  active = '0';
  selectedSize;
  successMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(private api: ApiService, private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._id = params['_id'];
      this.api.getItem(this._id).subscribe(res => {
        this.item = res[0];
        this.images = [];
        for (let i = 0; i < this.item['images'].length; i++) {
          const img = this.item['images'][i];
          this.images.push(new ImageItem({ src: `${environment.serverUrl}/${img}`, thumb: `${environment.serverUrl}/${img}` }));
        }
        console.log(this.item);
      });
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  selectSize(sz) {
    this.sizeDesc = sz.value;
    this.selectedSize = sz.key;
  }

  addItemToBag() {
    this.api.addToShoppingBag(this._id, this.selectedSize).subscribe(res => {
      console.log(res);
      this._success.next("This item was added to your bag successfully!");
    });
  }
}
