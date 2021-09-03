import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user.model';
export interface AuthResponseData {
  kind: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  regitered?: boolean;
}
@Injectable()
export class AuthEffects {
  @Effect() // to turn it into effect
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGHx8vKEMPfwDSJpJjndYRdXXfDziOiRk`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            const user = new User(
              resData.email,
              resData.localId,
              resData.idToken,
              expirationDate
            );
            localStorage.setItem('userData', JSON.stringify(user));
            return new AuthActions.AuthenticateSuccess({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorRes) => {
            let errMsg = 'An unknow error occured!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.AuthenticateFail(errMsg));
            }
            console.log(errorRes.error.error.message);

            switch (errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
                errMsg = 'This email exists already!';
                break;
            }
            return of(new AuthActions.AuthenticateFail(errMsg));
          })
        );
    })
  );

  @Effect() // to turn it into effect
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGHx8vKEMPfwDSJpJjndYRdXXfDziOiRk`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            const user = new User(
              resData.email,
              resData.localId,
              resData.idToken,
              expirationDate
            );
            localStorage.setItem('userData', JSON.stringify(user));
            return new AuthActions.AuthenticateSuccess({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorRes) => {
            let errMsg = 'An unknow error occured!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.AuthenticateFail(errMsg));
            }
            switch (errorRes.error.error.message) {
              case 'EMAIL_NOT_FOUND':
                errMsg = 'This email is not found!';
                break;
              case 'INVALID_PASSWORD':
                errMsg = 'This password is not correct!';
                break;
              case 'INVALID_PASSWORD':
                errMsg = 'This user account has been disabled!';
                break;
            }
            return of(new AuthActions.AuthenticateFail(errMsg));
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpiresDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpiresDate)
      );
      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpiresDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(+expirationDuration * 1000);

        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpiresDate),
        });
      }
      return { type: 'DUMMY' };
    })
  );
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/auth']);
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
