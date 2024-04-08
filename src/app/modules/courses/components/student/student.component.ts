import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiStatus } from '@taiga-ui/kit';
import { PolymorpheusComponent, PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { CoursesService } from 'modules/courses/services/courses.service';
import { EditMarkContextData } from 'modules/courses/types/EditMarkContextData';
import { finalize, take } from 'rxjs';
import { MarkType, StudentMarks, StudentShort, StudentStatuses } from 'shared/types/user';
import { getStudentStatusColor, translateStudentMark, translateStudentStatus } from 'shared/utils';
import { EditMarkComponent } from '../edit-mark/edit-mark.component';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent {
  @Input({ required: true }) courseId!: string;
  @Input({ required: true }) student!: StudentShort;
  @Output() refetchDetails = new EventEmitter<void>();
  private editMarkComponent!: PolymorpheusContent<TuiDialogContext>;
  isApplicationPanelLoading = false;
  StudentStatuses = StudentStatuses;
  translateStudentStatus = translateStudentStatus;
  translateStudentMark = translateStudentMark;
  getStudentStatusColor = getStudentStatusColor;
  MarkType = MarkType;

  constructor(
    private coursesService: CoursesService,
    private readonly injector: Injector,
    private dialogs: TuiDialogService,
  ) {
    this.editMarkComponent = new PolymorpheusComponent(EditMarkComponent, this.injector);
  }

  getMarkBadgeStyle(mark: StudentMarks): TuiStatus {
    switch (mark) {
      case StudentMarks.Failed:
        return 'error';
      case StudentMarks.NotDefined:
        return 'warning';
      case StudentMarks.Passed:
        return 'success';
    }
  }

  handleChangeUserStatus(status: StudentStatuses) {
    this.isApplicationPanelLoading = true;
    this.coursesService
      .editCourseStudentStatus(this.courseId, this.student.id, { status })
      .pipe(
        take(1),
        finalize(() => {
          this.isApplicationPanelLoading = false;
        }),
      )
      .subscribe({
        next: () => this.refetchDetails.emit(),
      });
  }

  handleEditMark(markType: MarkType) {
    const oldMark = markType === MarkType.Final ? this.student.finalResult : this.student.midtermResult;

    this.dialogs
      .open<EditMarkContextData>(this.editMarkComponent, {
        data: {
          studentName: this.student.name,
          courseId: this.courseId,
          studentId: this.student.id,
          markType,
          oldMark,
        },
      })
      .pipe(take(1))
      .subscribe({ next: () => this.refetchDetails.emit() });
  }
}
