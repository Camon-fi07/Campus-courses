import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'shared/constants/apiPaths';
import {
  AddCampusCourseNotificationModel,
  CourseDetails,
  CourseModel,
  EditCourseDto,
  EditCourseStatusModel,
} from 'shared/types/courses';

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {}

  getMyCourses() {
    return this.http.get<CourseModel[]>(API_PATHS.MY_COURSES);
  }

  getTeachingCourses() {
    return this.http.get<CourseModel[]>(API_PATHS.TEACHING_COURSES);
  }

  getCourseDetails(id: string) {
    return this.http.get<CourseDetails>(API_PATHS.COURSES_DETAILS(id));
  }

  createNotification(courseId: string, data: AddCampusCourseNotificationModel) {
    return this.http.post<void>(API_PATHS.COURSES_NOTIFICATIONS(courseId), data);
  }

  editCourse(courseId: string, data: EditCourseDto) {
    return this.http.put(API_PATHS.EDIT_COURSE(courseId), data);
  }

  editCourseStatus(courseId: string, data: EditCourseStatusModel) {
    return this.http.post(API_PATHS.EDIT_COURSE_STATUS(courseId), data);
  }
}
