import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'shared/constants/apiPaths';

@Injectable({
  providedIn: 'root',
})
export class APIUserService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<UserProfile>(API_PATHS.PROFILE);
  }

  getUserRoles() {
    return this.http.get<UserRoles>(API_PATHS.ROLES);
  }

  editProfile(data: EditUserProfileModel) {
    return this.http.put<UserProfile>(API_PATHS.PROFILE, data);
  }

  logout() {
    return this.http.post(API_PATHS.LOGOUT, {});
  }
}
