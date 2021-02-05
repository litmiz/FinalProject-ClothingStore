import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  sendQuery(query, cv){
    const formData: FormData = new FormData();
    formData.append('query', JSON.stringify(query));
    formData.append('cv', cv, cv.name);
    return this.http.post(environment.queryUrl, formData);
  }

  getCatalog(category=null, itemType=null, type=null){
    let httpParams = {};
    httpParams['page'] = '0';
    if (category != null) {
      httpParams['category'] = category;
    }
    if (itemType != null) {
      httpParams['itemType'] = itemType;
    }
    if (type != null) {
      httpParams['type'] = type;
    }
    return this.http.get(environment.catalogUrl, {params: httpParams});
  }

  getItem(id){
    return this.http.get(environment.itemUrl, {params: new HttpParams().set('_id', id)});
  }
}
