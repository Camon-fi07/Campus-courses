import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UserService } from 'core/services/user/user.service';
import { EditStatusComponent } from 'modules/courses/components/edit-status/edit-status.component';
import { EditingCourseComponent } from 'modules/courses/components/editing-course/editing-course.component';
import { CoursesService } from 'modules/courses/services/courses.service';
import { CourseUserRoles } from 'modules/courses/types/CourseUserRoles';
import { EditCourseContextData } from 'modules/courses/types/EditCourseContextData';
import { EditCourseStatusContextData } from 'modules/courses/types/EditCourseStatusContextData';
import { Observable, take } from 'rxjs';
import { API_PATHS } from 'shared/constants/apiPaths';
import { CourseDetails, CourseStatuses } from 'shared/types/courses';
import { UserShortDto } from 'shared/types/user';
import { translateSemester, translateCourseStatus, getStatusColor } from 'shared/utils';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails!: CourseDetails;
  isLoading = true;
  translateCourseStatus = translateCourseStatus;
  translateSemester = translateSemester;
  getStatusColor = getStatusColor;
  id!: string;
  CourseUserRoles = CourseUserRoles;
  CourseStatuses = CourseStatuses;
  courseUserRole: CourseUserRoles | null = null;
  isUserCanEdit = false;
  isUserSignUp = true;
  private editCourseDialog!: Observable<EditCourseContextData>;
  private editCourseStatusDialog!: Observable<EditCourseStatusContextData>;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private dialogs: TuiDialogService,
    private readonly injector: Injector,
    private readonly userService: UserService,
    private readonly http: HttpClient,
  ) {}

  fetchDetails() {
    this.isLoading = true;
    this.coursesService
      .getCourseDetails(this.id)
      .pipe(take(1))
      .subscribe(async (res) => {
        this.courseDetails = res;
        this.courseUserRole = this.getUserRole();
        this.isUserCanEdit = !!this.courseUserRole && this.courseUserRole !== CourseUserRoles.Student;
        if (this.isUserCanEdit) {
          this.editCourseStatusDialog = this.dialogs.open<EditCourseStatusContextData>(
            new PolymorpheusComponent(EditStatusComponent, this.injector),
            {
              data: { id: this.courseDetails.id, status: this.courseDetails.status },
            },
          );

          this.editCourseDialog = this.dialogs.open<EditCourseContextData>(
            new PolymorpheusComponent(EditingCourseComponent, this.injector),
            {
              data: await this.convertCourseDetails(),
            },
          );
        } else this.checkIsUserSignUp();
        this.isLoading = false;
      });
  }

  async ngOnInit() {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.id = params['id'];
    });
    this.fetchDetails();
  }

  checkIsUserSignUp() {
    this.coursesService
      .getMyCourses()
      .pipe(take(1))
      .subscribe({
        next: (courses) => {
          this.isUserSignUp = courses.some((course) => course.id === this.courseDetails.id);
        },
      });
  }

  getUserRole() {
    const { isAdmin } = this.userService.userRoles.value!;
    const { email } = this.userService.userProfile.value!;

    if (isAdmin) return CourseUserRoles.Admin;

    const teacher = this.courseDetails.teachers.find((teacher) => teacher.email === email);
    if (teacher) {
      if (teacher.isMain) return CourseUserRoles.MainTeacher;
      else return CourseUserRoles.Teacher;
    }
    const student = this.courseDetails.students.find((student) => student.email === email);
    if (student) return CourseUserRoles.Student;
    return null;
  }

  getMainTeacherId() {
    return new Promise((resolve) => {
      this.http
        .get<UserShortDto[]>(API_PATHS.USERS)
        .pipe(take(1))
        .subscribe({
          next: (users) => {
            const { teachers } = this.courseDetails;
            const mainTeacher = teachers.find((teacher) => teacher.isMain);
            const mainTeacherId = users.find((user) => user.fullName === mainTeacher?.name)?.id;
            resolve(mainTeacherId || '');
          },
        });
    });
  }

  async convertCourseDetails() {
    const { id, name, requirements, annotations, maximumStudentsCount, semester, startYear } = this.courseDetails!;

    const mainTeacherId = await this.getMainTeacherId();

    return {
      id,
      annotations,
      name,
      maximumStudentsCount,
      requirements,
      semester,
      startYear,
      mainTeacherId: mainTeacherId,
      userRole: this.courseUserRole,
    };
  }

  handleEditCourse() {
    this.editCourseDialog.pipe(take(1)).subscribe({
      next: () => this.fetchDetails(),
    });
  }

  handleEditStatusCourse() {
    this.editCourseStatusDialog.pipe(take(1)).subscribe({
      next: () => this.fetchDetails(),
    });
  }

  handleSignUpForCourse() {
    this.coursesService
      .signUpForCourse(this.courseDetails.id)
      .pipe(take(1))
      .subscribe({
        next: () => this.fetchDetails(),
      });
  }
}
