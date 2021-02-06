import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  login(user:User) :any {
    return this.http.post<User>(`${environment.serverUrl}/users/login`, user);
  }

  register(user:User) : any {
    return this.http.post<User>(`${environment.serverUrl}/users/register`, user);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  getToken(){
    return localStorage.getItem('token');
  };

  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
