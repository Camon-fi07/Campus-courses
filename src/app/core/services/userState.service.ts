import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { deleteCookieValue, getCookieValue, setCookieValue } from 'shared/utils';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private _isAuth = new BehaviorSubject(false);
  private _token?: string;
  private _userRoles = new BehaviorSubject<UserRoles | null>(null);
  private _userProfile = new BehaviorSubject<UserProfile | null>(null);

  constructor() {
    this._token = getCookieValue('token');
    if (this._token) this._isAuth.next(true);
  }

  deleteUser() {
    this._userProfile.next(null);
    this._userRoles.next(null);
    this._isAuth.next(false);
    deleteCookieValue('token');
  }

  setToken(token: string) {
    setCookieValue('token', token, new Date(Date.now() + 3600 * 1000), true);
    this._isAuth.next(true);
  }

  get isAuth(): BehaviorSubject<boolean> {
    return this._isAuth;
  }

  get token(): string {
    return this.token;
  }

  get userRoles(): BehaviorSubject<UserRoles | null> {
    return this._userRoles;
  }

  get userProfile(): BehaviorSubject<UserProfile | null> {
    return this._userProfile;
  }

  set userRoles(userRoles: UserRoles | null) {
    this._userRoles.next(userRoles);
  }

  set userProfile(userProfile: UserProfile | null) {
    this._userProfile.next(userProfile);
  }
}
