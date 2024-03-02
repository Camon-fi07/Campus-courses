import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { LOGIN } from 'shared/constants/apiPaths';
import { TokenResponse, UserLoginModel } from 'shared/types/user';
import { setCookieValue } from 'shared/utils/cookie';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuth = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

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
}
