import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  sendQuery(query){
    return this.http.post(environment.queryUrl, query);
  }

  getCatalog(category=null){
    let httpParams = {};
    httpParams['page'] = '0';
    if (category != null) {
      httpParams['category'] = category;
    }
    return this.http.get(environment.catalogUrl, {params: httpParams});
  }

  getItem(id){
    return this.http.get(environment.itemUrl, {params: new HttpParams().set('_id', id)});
  }
}
