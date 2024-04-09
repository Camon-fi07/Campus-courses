import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { EditCourseStatusContextData } from 'modules/courses/types/EditCourseStatusContextData';
import { take } from 'rxjs';
import { translateCourseStatus } from 'shared/utils';

@Component({
  selector: 'edit-status',
  templateUrl: './edit-status.component.html',
  styleUrl: './edit-status.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditStatusComponent implements OnInit {
  formGroup!: FormGroup;
  translateCourseStatus = translateCourseStatus;
  isLoading = false;

  variants: CourseStatuses[] = ['Finished', 'OpenForAssigning', 'Started'];

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, EditCourseStatusContextData>,
    private APICoursesService: APICoursesService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({ status: new FormControl<CourseStatuses>(this.context.data.status) });
  }

  handleSubmit() {
    this.isLoading = true;
    this.APICoursesService.editCourseStatus(this.context.data.id, this.formGroup.value)
      .pipe(take(1))
      .subscribe({ next: () => this.context.completeWith() });
  }
}
