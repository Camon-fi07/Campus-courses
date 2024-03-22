import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'shared/constants/apiPaths';
import { CourseModel } from 'shared/types/courses';

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {}

  getMyCourses() {
    return this.http.get<CourseModel[]>(API_PATHS.MY_COURSES);
  }

  getTeachingCourses() {
    return this.http.get<CourseModel[]>(API_PATHS.TEACHING_COURSES);
  }
}
