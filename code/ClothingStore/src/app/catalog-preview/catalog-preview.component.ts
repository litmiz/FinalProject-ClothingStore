import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-preview',
  templateUrl: './catalog-preview.component.html',
  styleUrls: ['./catalog-preview.component.css']
})
export class CatalogPreviewComponent implements OnInit {
  images = [];

  constructor() { 
    for (let i = 0; i < 4; i++) {
      this.images.push(`../../assets/homeCarousel0${1+ (i % 3)}.png`)
    }
  }

  ngOnInit(): void {
  }

}
