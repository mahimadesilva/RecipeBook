import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  refreshToken: string;
  email: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhNpJVE1i8EEDLzd8rcXu6XhuWGzNzQEU',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler), //Don't forget to bind 'this' if needed
        tap(this.authenticationHandler.bind(this))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhNpJVE1i8EEDLzd8rcXu6XhuWGzNzQEU',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap(this.authenticationHandler.bind(this))
      );
  }

  autoLogin() {
    const userString = localStorage.getItem('userData');
    if (userString) {
      let userObject = JSON.parse(userString);
      try {
        const user = new User(
          userObject.email,
          userObject.id,
          userObject._token,
          new Date(userObject._tokenExpirationDate)
        );
        return this.user.next(user);
      } catch (err) {
        console.log(err);
      }
    }
    return this.user.next(null);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData')
  }

  private authenticationHandler(resData: AuthResponseData) {
    const expirationDate = new Date(Date.now() + +resData.expiresIn * 1000);
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandler(errRes: HttpErrorResponse) {
    let errMessage = 'Unknown Error Occured';
    if (errRes?.error?.error?.message) {
      switch (errRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errMessage =
            'The email address is already in use by another account.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errMessage =
            'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        case 'EMAIL_NOT_FOUND':
          errMessage =
            'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          errMessage = 'The password is invalid.';
          break;
        case 'USER_DISABLED':
          errMessage =
            'The user account has been disabled by an administrator.';
      }
    }
    return throwError(errMessage);
  }
}

// BehaviourSubject: Act same as a subject but gives access to previously emitted value
