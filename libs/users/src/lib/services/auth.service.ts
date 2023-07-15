import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '@env/environment';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = Environment.apiUrl + 'users';

  constructor(
    private http : HttpClient, 
    private localStorageService : LocalStorageService,
    private router : Router) {}

  logIn(email: string, password: string) : Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password});
  }

  logOut(){
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
