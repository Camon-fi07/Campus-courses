import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'core/services/user/user.service';
import { tap } from 'rxjs';
import { LOGIN, REGISTRATION } from 'shared/constants/apiPaths';
import { TokenResponse, UserLoginModel, UserRegisterModel } from 'shared/types/user';
import { setCookieValue } from 'shared/utils';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  login(data: UserLoginModel) {
    return this.http.post<TokenResponse>(LOGIN, data).pipe(
      tap((res) => {
        setCookieValue('token', res.token, new Date(Date.now() + 3600 * 1000), true);
        this.userService.isAuth = true;
      }),
    );
  }

  registration(data: UserRegisterModel) {
    return this.http.post<TokenResponse>(REGISTRATION, data).pipe(
      tap((res) => {
        setCookieValue('token', res.token, new Date(Date.now() + 3600 * 1000), true);
        this.userService.isAuth = true;
      }),
    );
  }
}
