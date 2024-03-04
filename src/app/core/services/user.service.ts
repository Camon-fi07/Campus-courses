import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { LOGIN, REGISTRATION, ROLES } from 'shared/constants/apiPaths';
import { TokenResponse, UserLoginModel, UserRegisterModel, UserRoles } from 'shared/types/user';
import { getCookieValue, setCookieValue } from 'shared/utils/cookie';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuth = new BehaviorSubject(false);
  private token?: string;
  private userRoles = new BehaviorSubject({
    isAdmin: false,
    isStudent: false,
    isTeacher: false,
  });

  constructor(private http: HttpClient) {
    this.token = getCookieValue('token');
    if (this.token) this.isAuth.next(true);

    this.isAuth.subscribe({
      next: (res) => {
        if (res) this.requestUserRoles();
      },
    });
  }

  login(data: UserLoginModel) {
    return this.http.post<TokenResponse>(LOGIN, data).pipe(
      map((res) => {
        this.isAuth.next(true);
        setCookieValue('token', res.token, new Date(Date.now() + 3600 * 1000), true);
        return res;
      }),
      catchError((err) => {
        this.isAuth.next(false);
        throw err;
      }),
    );
  }

  registration(data: UserRegisterModel) {
    return this.http.post<TokenResponse>(REGISTRATION, data).pipe(
      map((res) => {
        this.isAuth.next(true);
        setCookieValue('token', res.token, new Date(Date.now() + 3600 * 1000), true);
        return res;
      }),
      catchError((err) => {
        this.isAuth.next(false);
        throw err;
      }),
    );
  }

  requestUserRoles() {
    this.http
      .get<UserRoles>(ROLES, { headers: { Authorization: `Bearer ${this.token}` } })
      .subscribe({
        next: (res) => {
          this.userRoles.next(res);
        },
      });
  }

  get getIsAuth() {
    return this.isAuth;
  }

  get getToken() {
    return this.token;
  }

  get getUserRoles() {
    return this.userRoles;
  }
}
