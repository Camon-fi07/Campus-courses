import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { NotificationContextData } from 'modules/courses/types/NotificationContextData';
import { take } from 'rxjs';

@Component({
  selector: 'creating-notification',
  templateUrl: './creating-notification.component.html',
  styleUrl: './creating-notification.component.scss',
})
export class CreatingNotificationComponent {
  formGroup!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, NotificationContextData>,
    private APICoursesService: APICoursesService,
    private alerts: TuiAlertService,
  ) {
    this.formGroup = fb.group({
      text: new FormControl('', Validators.required),
      isImportant: new FormControl(false),
    });
  }

  handleSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.isLoading = true;
      const { id } = this.context.data;
      this.APICoursesService.createNotification(id, this.formGroup.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.context.completeWith();
          },
          error: (e) => {
            this.isLoading = false;
            this.alerts.open(e.message, { label: 'Произошла ошибка', status: 'error' }).pipe(take(1)).subscribe();
          },
        });
    }
  }
}
