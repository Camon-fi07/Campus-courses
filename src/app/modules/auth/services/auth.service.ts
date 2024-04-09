import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStateService } from 'core/services/userState.service';
import { tap } from 'rxjs';
import { API_PATHS } from 'shared/constants/apiPaths';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private userStateService: UserStateService,
  ) {}

  login(data: UserLoginModel) {
    return this.http
      .post<TokenResponse>(API_PATHS.LOGIN, data)
      .pipe(tap((res) => this.userStateService.setToken(res.token)));
  }

  registration(data: UserRegisterModel) {
    return this.http
      .post<TokenResponse>(API_PATHS.REGISTRATION, data)
      .pipe(tap((res) => this.userStateService.setToken(res.token)));
  }
}
