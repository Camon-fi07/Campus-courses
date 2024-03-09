import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LOGIN, LOGOUT, PROFILE, REGISTRATION, ROLES } from 'shared/constants/apiPaths';
import {
  TokenResponse,
  UserLoginModel,
  UserProfile,
  UserRegisterModel,
  UserRoles,
} from 'shared/types/user';
import { deleteCookieValue, getCookieValue, setCookieValue } from 'shared/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuth = new BehaviorSubject(false);
  private token?: string;
  private userRoles = new BehaviorSubject<UserRoles | null>(null);
  private userProfile = new BehaviorSubject<UserProfile | null>(null);

  constructor(private http: HttpClient) {
    this.token = getCookieValue('token');
    if (this.token) this.isAuth.next(true);

    this.isAuth.subscribe({
      next: (res) => {
        this.token = getCookieValue('token');
        if (res) {
          this.requestUserRoles();
          this.requestProfile().subscribe();
        } else {
          this.userProfile.next(null);
          this.userRoles.next(null);
        }
      },
    });
  }

  login(data: UserLoginModel) {
    return this.http.post<TokenResponse>(LOGIN, data).pipe(
      map((res) => {
        setCookieValue('token', res.token, new Date(Date.now() + 3600 * 1000), true);
        this.isAuth.next(true);
        return res;
      }),
    );
  }

  requestProfile() {
    return this.http.get<UserProfile>(PROFILE).pipe(
      map((res) => {
        this.userProfile.next(res);
        return res;
      }),
    );
  }

  registration(data: UserRegisterModel) {
    return this.http.post<TokenResponse>(REGISTRATION, data).pipe(
      map((res) => {
        setCookieValue('token', res.token, new Date(Date.now() + 3600 * 1000), true);
        this.isAuth.next(true);
        return res;
      }),
    );
  }

  logout() {
    return this.http.post(LOGOUT, {}).pipe(
      map((res) => {
        deleteCookieValue('token');
        this.isAuth.next(false);
        return res;
      }),
    );
  }

  requestUserRoles() {
    this.http.get<UserRoles>(ROLES).subscribe({
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

  get getUserProfile() {
    return this.userProfile;
  }
}
