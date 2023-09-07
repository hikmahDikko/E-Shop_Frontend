import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from "@env/environment";
import { Observable, map } from "rxjs";
import { User } from "../models/users";
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from "../state/users.facade";

//@ts-ignore
declare const require;

const apiUrl = Environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient, private usersFacade : UsersFacade) { 
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
  }
  
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

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(apiUrl + 'users/get/count')
      .pipe(map((objectValue: any) => objectValue.count));
  }

  initAppSession(){
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser(){
    return this.usersFacade.currentUser$;
  }

  observeCurrentUserAuth(){
    return this.usersFacade.isAuth$;
  }  
}
