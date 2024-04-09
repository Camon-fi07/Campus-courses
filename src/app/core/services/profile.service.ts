import { Injectable } from '@angular/core';
import { APIUserService } from 'core/API/requests/apiuser.service';
import { take } from 'rxjs';
import { UserStateService } from './userState.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private APIUserService: APIUserService,
    private userStateService: UserStateService,
  ) {
    this.userStateService.isAuth.subscribe({
      next: (isAuth) => {
        if (isAuth) this.getUser();
      },
    });
  }

  private getProfile() {
    this.APIUserService.getProfile()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.userStateService.userProfile = res;
        },
      });
  }

  private getUserRoles() {
    this.APIUserService.getUserRoles()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.userStateService.userRoles = res;
        },
      });
  }

  getUser() {
    this.getProfile();
    this.getUserRoles();
  }
}
