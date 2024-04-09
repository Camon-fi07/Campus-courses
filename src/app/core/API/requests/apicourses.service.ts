import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATHS } from 'shared/constants/apiPaths';

@Injectable({
  providedIn: 'root',
})
export class APICoursesService {
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

  signUpForCourse(courseId: string) {
    return this.http.post(API_PATHS.COURSES_SIGNUP(courseId), {});
  }

  editCourseRequireAndAnnotation(courseId: string, data: EditCampusCourseRequirementsAndAnnotationsModel) {
    return this.http.put(API_PATHS.EDIT_COURSE_REQUIRE_AND_ANNOTATION(courseId), data);
  }

  addCourseTeacher(courseId: string, data: AddTeacherToCourseModel) {
    return this.http.post(API_PATHS.ADD_COURSES_TEACHER(courseId), data);
  }

  editCourseStudentStatus(courseId: string, studentId: string, data: EditCourseStudentStatusModel) {
    return this.http.post(API_PATHS.EDIT_COURSES_STUDENT_STATUS(courseId, studentId), data);
  }

  editCourseStudentMark(courseId: string, studentId: string, data: EditCourseStudentMarkModel) {
    return this.http.post(API_PATHS.EDIT_COURSES_STUDENT_MARK(courseId, studentId), data);
  }
}
