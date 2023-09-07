import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, concatMap, map } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { LocalStorageService } from '../services/local-storage.service';
import { UsersService } from '../services/users.services';

@Injectable()
export class UsersEffects {
  constructor( private actions$ : Actions, private localStorageService : LocalStorageService, private userService : UsersService){}

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if(this.localStorageService.isValidToken()){
          const userId = this.localStorageService.getUserIdFromToken();
          if(userId){
            return this.userService.getUser(userId).pipe(
              map((user) => {
                return UsersActions.buildUserSessionSuccess({user : user});
              }),
              catchError((error) => of(UsersActions.buildUserSessionFailed()))
            );
          } else {
            return of(UsersActions.buildUserSessionFailed());
          }
        } else {
           return of(UsersActions.buildUserSessionFailed());
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(UsersActions.buildUserSessionFailed());
      })
  ))
}
