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

  constructor(private api:ApiService) { 
  }
  
  ngOnInit(): void {
    this.api.getCatalog().subscribe(res => {
      console.log(res);
      
      for (let i = 0; i < 5; i++) {
        this.items.push(res[i]);
      }
    })
  }
}
