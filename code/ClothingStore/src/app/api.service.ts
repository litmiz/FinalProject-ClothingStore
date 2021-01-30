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

  getCatalog(){
    return this.http.get(environment.catalogUrl, {params: new HttpParams().set('page', '0')});
  }
}
