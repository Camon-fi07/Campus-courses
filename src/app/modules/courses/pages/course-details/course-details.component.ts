import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent, PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { UserStateService } from 'core/services/userState.service';
import { EditingCourseComponent } from 'modules/courses/components/editing-course/editing-course.component';
import { CourseUserRoles } from 'modules/courses/types/CourseUserRoles';
import { EditCourseContextData } from 'modules/courses/types/EditCourseContextData';
import { Observable, Subscription, take } from 'rxjs';
import { API_PATHS } from 'shared/constants/apiPaths';
import { ROUTES } from 'shared/constants/routes';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails!: CourseDetails;
  isLoading = true;
  id!: string;
  courseUserRole: CourseUserRoles | null = null;
  isUserCanEdit = false;
  isUserCanAddTeacher = false;
  private editCourseDialog!: Observable<EditCourseContextData>;
  deleteCourseSubscription?: Subscription;

  constructor(
    private APICoursesService: APICoursesService,
    private activatedRoute: ActivatedRoute,
    private dialogs: TuiDialogService,
    private readonly injector: Injector,
    private readonly userStateService: UserStateService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  fetchDetails() {
    this.isLoading = true;
    this.APICoursesService.getCourseDetails(this.id)
      .pipe(take(1))
      .subscribe(async (res) => {
        this.courseDetails = res;
        this.courseUserRole = this.getUserRole();
        this.isUserCanEdit = !!this.courseUserRole && this.courseUserRole !== CourseUserRoles.Student;
        this.isUserCanAddTeacher =
          !!this.courseUserRole &&
          (this.courseUserRole === CourseUserRoles.Admin || this.courseUserRole === CourseUserRoles.MainTeacher);
        if (this.isUserCanEdit) {
          this.editCourseDialog = this.dialogs.open<EditCourseContextData>(
            new PolymorpheusComponent(EditingCourseComponent, this.injector),
            {
              data: await this.convertCourseDetails(),
            },
          );
        }
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.id = params['id'];
    });
    this.fetchDetails();
  }

  getUserRole() {
    const { isAdmin } = this.userStateService.userRoles.value!;
    const { email } = this.userStateService.userProfile.value!;

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
    if (this.isUserCanAddTeacher) {
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
    return '';
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

  handleOpenDeleteConfirmation(content: PolymorpheusContent<TuiDialogContext>) {
    this.deleteCourseSubscription = this.dialogs.open(content).pipe(take(1)).subscribe();
  }

  handleDeleteCourse() {
    this.APICoursesService.deleteCourse(this.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.deleteCourseSubscription?.unsubscribe();
          this.router.navigate([ROUTES.GROUPS]);
        },
      });
  }
}
