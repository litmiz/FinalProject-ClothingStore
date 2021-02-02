import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {
  @Input() category
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (changes.category) {
      console.log(this.category);
      this.api.getCatalog(this.category).subscribe(res => {
        console.log(res);

      })
    }
  }

}
