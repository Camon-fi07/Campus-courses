import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'shared/constants/apiPaths';
import { GroupDto } from 'shared/types/groups';

@Injectable()
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroupsList() {
    return this.http.get<GroupDto[]>(API_PATHS.GROUPS);
  }
}
