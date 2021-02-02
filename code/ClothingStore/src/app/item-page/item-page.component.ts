import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { GalleryItem, ImageItem } from 'ng-gallery';


@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  item = {};
  images: GalleryItem[];
  sizeDesc = {};
  @Input() _id;
  active = '0';
  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  
  ngOnChanges(changes:any){
    if(changes._id){
      this.api.getItem(this._id).subscribe(res => {
        this.item = res[0];
        this.images = [];
        for (let i = 0; i < this.item['images'].length; i++) {
          const img = this.item['images'][i];
          this.images.push(new ImageItem({ src: `${environment.serverUrl}/${img}`, thumb: `${environment.serverUrl}/${img}` }));
        }
        console.log(this.item);
      }); 
    }
  }

}
