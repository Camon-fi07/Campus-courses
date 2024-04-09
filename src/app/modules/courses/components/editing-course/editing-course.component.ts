import { Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { CourseUserRoles } from 'modules/courses/types/CourseUserRoles';
import { EditCourseContextData } from 'modules/courses/types/EditCourseContextData';
import { take } from 'rxjs';

@Component({
  selector: 'editing-course',
  templateUrl: './editing-course.component.html',
  styleUrl: './editing-course.component.scss',
})
export class EditingCourseComponent {
  initValues!: EditCourseDto;
  CourseUserRoles = CourseUserRoles;
  userRole: CourseUserRoles | null = null;
  courseId!: string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, EditCourseContextData>,
    private readonly APICoursesService: APICoursesService,
  ) {
    const { id, userRole, ...initValues } = context.data;
    this.initValues = initValues;
    this.courseId = id;
    this.userRole = userRole;
  }

  handleEditCourse(data: EditCourseDto | EditCampusCourseRequirementsAndAnnotationsModel) {
    if (this.userRole === CourseUserRoles.Admin) {
      this.APICoursesService.editCourse(this.courseId, data as EditCourseDto)
        .pipe(take(1))
        .subscribe({
          next: () => this.context.completeWith(),
        });
    } else {
      this.APICoursesService.editCourseRequireAndAnnotation(this.courseId, data)
        .pipe(take(1))
        .subscribe({
          next: () => this.context.completeWith(),
        });
    }
  }
}
