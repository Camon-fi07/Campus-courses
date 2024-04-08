import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CoursesService } from 'modules/courses/services/courses.service';
import { CourseUserRoles } from 'modules/courses/types/CourseUserRoles';
import { EditCourseStatusContextData } from 'modules/courses/types/EditCourseStatusContextData';
import { Observable, take } from 'rxjs';
import { CourseStatuses, Semesters } from 'shared/types/courses';
import { getCourseStatusColor, translateCourseStatus, translateSemester } from 'shared/utils';
import { EditStatusComponent } from '../edit-status/edit-status.component';

@Component({
  selector: 'main-data',
  templateUrl: './main-data.component.html',
  styleUrl: './main-data.component.scss',
})
export class MainDataComponent implements OnInit {
  @Input({ required: true }) courseId!: string;
  @Input({ required: true }) status!: CourseStatuses;
  @Input({ required: true }) isUserCanEdit!: boolean;
  @Input({ required: true }) startYear!: number;
  @Input({ required: true }) semester!: Semesters;
  @Input({ required: true }) maximumStudentsCount!: number;
  @Input({ required: true }) studentsEnrolledCount!: number;
  @Input({ required: true }) studentsInQueueCount!: number;
  @Output() refetchDetails = new EventEmitter<void>();
  translateCourseStatus = translateCourseStatus;
  translateSemester = translateSemester;
  getCourseStatusColor = getCourseStatusColor;
  CourseUserRoles = CourseUserRoles;
  CourseStatuses = CourseStatuses;
  isUserSignUp = false;
  private editCourseStatusDialog!: Observable<EditCourseStatusContextData>;

  constructor(
    private coursesService: CoursesService,
    private dialogs: TuiDialogService,
    private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    if (this.isUserCanEdit) {
      this.editCourseStatusDialog = this.dialogs.open<EditCourseStatusContextData>(
        new PolymorpheusComponent(EditStatusComponent, this.injector),
        {
          data: { id: this.courseId, status: this.status },
        },
      );
    } else {
      this.checkIsUserSignUp();
    }
  }

  checkIsUserSignUp() {
    this.coursesService
      .getMyCourses()
      .pipe(take(1))
      .subscribe({
        next: (courses) => {
          this.isUserSignUp = courses.some((course) => course.id === this.courseId);
        },
      });
  }

  handleSignUpForCourse() {
    this.coursesService
      .signUpForCourse(this.courseId)
      .pipe(take(1))
      .subscribe({
        next: () => this.refetchDetails.emit(),
      });
  }

  handleEditStatusCourse() {
    this.editCourseStatusDialog.pipe(take(1)).subscribe({
      next: () => this.refetchDetails.emit(),
    });
  }
}
