import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { EditMarkContextData } from 'modules/courses/types/EditMarkContextData';
import { take } from 'rxjs';
import { translateStudentMark } from 'shared/utils';

@Component({
  selector: 'edit-mark',
  templateUrl: './edit-mark.component.html',
  styleUrl: './edit-mark.component.scss',
})
export class EditMarkComponent {
  isLoading = false;
  formGroup!: FormGroup;
  translateStudentMark = translateStudentMark;
  variants: StudentMarks[] = ['Failed', 'Passed'];

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, EditMarkContextData>,
    private APICoursesService: APICoursesService,
  ) {
    this.formGroup = fb.group({ mark: new FormControl<StudentMarks>(context.data.oldMark || 'NotDefined') });
  }

  handleSubmit() {
    if (this.formGroup.value.mark === this.context.data.oldMark) this.context.$implicit.complete();
    else {
      const { courseId, markType, studentId } = this.context.data;
      this.APICoursesService.editCourseStudentMark(courseId, studentId, { markType, mark: this.formGroup.value.mark })
        .pipe(take(1))
        .subscribe({ next: () => this.context.completeWith() });
    }
  }
}
