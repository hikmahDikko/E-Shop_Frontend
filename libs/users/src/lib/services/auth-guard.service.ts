import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router, private localStorageService : LocalStorageService) { }

  private _tokenExpires(expiersIn : any) : boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiersIn;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageService.getToken();

    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));      

      if(tokenDecode.isAdmin === true && this._tokenExpires(tokenDecode.exp)) return true;

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
