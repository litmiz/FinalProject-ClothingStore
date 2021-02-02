import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-catalog-preview',
  templateUrl: './catalog-preview.component.html',
  styleUrls: ['./catalog-preview.component.css']
})
export class CatalogPreviewComponent implements OnInit {
  items = [];
  @Output() mainMenuChoice = new EventEmitter();

  constructor(private api:ApiService) { 
  }
  
  ngOnInit(): void {
      // for (let i = 0; i < 4; i++) {
      //   this.images.push(`../../assets/homeCarousel0${1+ (i % 3)}.png`)
      // }
    // console.log(newQuery);
    this.api.getCatalog().subscribe(res => {
      console.log(res);
      
      for (let i = 0; i < 5; i++) {
        this.items.push(res[i]);
      }
      // items.forEach(item => {
      //   this.images.push(`${environment.serverUrl}/${item.images[0]}`);
      // });
    })
  }

  chooseFromMenu(choice):void
  {
    console.log("preview");
    this.mainMenuChoice.emit(choice);
  }

}
