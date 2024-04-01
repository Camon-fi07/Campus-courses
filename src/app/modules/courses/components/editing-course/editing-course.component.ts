import { Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CoursesService } from 'modules/courses/services/courses.service';
import { EditCourseContextData } from 'modules/courses/types/EditCourseContextData';
import { take } from 'rxjs';
import { EditCourseDto } from 'shared/types/courses';

@Component({
  selector: 'editing-course',
  templateUrl: './editing-course.component.html',
  styleUrl: './editing-course.component.scss',
})
export class EditingCourseComponent {
  initValues!: EditCourseDto;
  courseId!: string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, EditCourseContextData>,
    private readonly coursesService: CoursesService,
  ) {
    const { id, ...initValues } = context.data;
    this.initValues = initValues;
    this.courseId = id;
  }

  handleSubmit(data: EditCourseDto) {
    this.coursesService
      .editCourse(this.courseId, data)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.context.completeWith();
        },
      });
  }
}
