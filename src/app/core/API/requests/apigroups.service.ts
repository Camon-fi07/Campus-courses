import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'shared/constants/apiPaths';

@Injectable({
  providedIn: 'root',
})
export class APIGroupsService {
  constructor(private http: HttpClient) {}

  getGroupsList() {
    return this.http.get<GroupDto[]>(API_PATHS.GROUPS);
  }

  addGroup(data: CreateCampusGroupModel) {
    return this.http.post(API_PATHS.GROUPS, data);
  }

  editGroup(id: string, data: EditCampusGroupModel) {
    return this.http.put(API_PATHS.CONCRETE_GROUP(id), data);
  }

  deleteGroup(id: string) {
    return this.http.delete(API_PATHS.CONCRETE_GROUP(id));
  }

  getGroupCourses(id: string) {
    return this.http.get<CourseModel[]>(API_PATHS.CONCRETE_GROUP(id));
  }
}
