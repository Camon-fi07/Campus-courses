import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { API_PATHS } from 'shared/constants/apiPaths';
import { EditUserProfileModel, UserProfile, UserRoles } from 'shared/types/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    userService.isAuth.subscribe({
      next: (res) => {
        if (res) this.getUser();
      },
    });
  }

  getProfile() {
    return this.http.get<UserProfile>(API_PATHS.PROFILE).pipe(
      tap((res) => {
        this.userService.userProfile = res;
      }),
    );
  }

  getUserRoles() {
    return this.http.get<UserRoles>(API_PATHS.ROLES).pipe(
      tap((res) => {
        this.userService.userRoles = res;
      }),
    );
  }

  editProfile(data: EditUserProfileModel) {
    return this.http.put<UserProfile>(API_PATHS.PROFILE, data).pipe(
      tap((res) => {
        this.userService.userProfile = res;
      }),
    );
  }

  getUser() {
    this.getProfile().subscribe();
    this.getUserRoles().subscribe();
  }

  logout() {
    return this.http.post(API_PATHS.LOGOUT, {}).pipe(
      tap(() => {
        this.userService.deleteUser();
      }),
    );
  }
}
