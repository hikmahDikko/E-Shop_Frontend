import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from "@env/environment";
import { Observable } from "rxjs";
import { User } from "../models/users";
import * as countriesLib from 'i18n-iso-countries';

//@ts-ignore
declare const require;

const apiUrl = Environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }
  
  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(apiUrl + 'users');
  }

  getUser(userId : string) : Observable<User> {
    return this.http.get<User>(apiUrl + 'users/'+userId);
  }

  createUser(user : User) : Observable<User> {
    return this.http.post<User>(apiUrl + 'users/create', user);
  }

  deleteUser(userId : string) : Observable<User> {
    return this.http.delete<User>(apiUrl + 'users/'+userId);
  }

  updateUser(userId : string, user : User) : Observable<User> {
    return this.http.put<User>(apiUrl + 'users/'+userId, user);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
}
