import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from './user';

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

  getCatalog(category=null, itemType=null, type=null, sortBy=null){
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
    if (sortBy != null) {
      httpParams['sortBy'] = sortBy;
    }
    return this.http.get(environment.catalogUrl, {params: httpParams});
  }

  getItem(id){
    return this.http.get(environment.itemUrl, {params: new HttpParams().set('_id', id)});
  }

  getUserDetails(){
    return this.http.get<User>(`${environment.usersUrl}/myPersonalInfo`);
  }

  updateUserDetails(user: User){
    return this.http.put<User>(`${environment.usersUrl}/editMyInfo`, user);
  }
}
