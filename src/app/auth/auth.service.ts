import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/Operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
export interface AuthResponseData {
  kind: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  regitered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGHx8vKEMPfwDSJpJjndYRdXXfDziOiRk`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => {
          let errMsg = 'An unknow error occured!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errMsg);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errMsg = 'This email exists already!';
              break;
          }
          return throwError(errMsg);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.idToken,
            resData.localId,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGHx8vKEMPfwDSJpJjndYRdXXfDziOiRk`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => {
          let errMsg = 'An unknow error occured!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errMsg);
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
          return throwError(errMsg);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.idToken,
            resData.localId,
            +resData.expiresIn
          );
        })
      );
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiresDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpiresDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpiresDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
  autoLogout(expirationDuration: number) {
    console.log();

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  private handleAuthentication(
    email: string,
    token: string,
    userId: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
