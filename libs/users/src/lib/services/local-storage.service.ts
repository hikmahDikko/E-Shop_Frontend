import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(data : any) {
    localStorage.setItem(TOKEN, data)
  }

  getToken(){
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  isValidToken(){
    const token = this.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      return !this._tokenExpires(tokenDecode.exp);

    } else {
      return false;
    }
  }

  private _tokenExpires(expiersIn : any) : boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiersIn;
  }

  getUserIdFromToken(){
    const token = this.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if(tokenDecode){
        return tokenDecode.userId;
      }else{
        return null;
      }
    } else {
      return null;
    }
  }

}
