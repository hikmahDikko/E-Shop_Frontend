import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from "@env/environment";
import { Observable } from "rxjs";
import { User } from "../models/users";

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

  createUser(user : FormData) : Observable<User> {
    return this.http.post<User>(apiUrl + 'users/create', user);
  }

  deleteUser(userId : string) : Observable<User> {
    return this.http.delete<User>(apiUrl + 'users/'+userId);
  }

  updateUser(userId : string, user : FormData) : Observable<User> {
    return this.http.put<User>(apiUrl + 'users/'+userId, user);
  }

}
