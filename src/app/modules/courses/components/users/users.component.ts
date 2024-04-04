import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiStatus } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddingTeacherContextData } from 'modules/courses/types/AddingTeacherContextData';
import { NotificationContextData } from 'modules/courses/types/NotificationContextData';
import { Observable, take } from 'rxjs';
import { StudentMarks, StudentShort, StudentStatuses, TeacherShort } from 'shared/types/user';
import { getStudentStatusColor, translateStudentMark, translateStudentStatus } from 'shared/utils';
import { AddingTeacherComponent } from '../adding-teacher/adding-teacher.component';
import { ContentType } from './users.types';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  @Input({ required: true }) teachers!: TeacherShort[];
  @Input({ required: true }) students!: StudentShort[];
  @Input({ required: true }) id!: string;
  @Input({ required: true }) isUserCanEdit!: boolean;
  @Output() refetchDetails = new EventEmitter<void>();
  private addingTeacherDialog!: Observable<NotificationContextData>;
  translateStudentStatus = translateStudentStatus;
  translateStudentMark = translateStudentMark;
  getStudentStatusColor = getStudentStatusColor;
  StudentStatuses = StudentStatuses;

  tabVariants = [
    { key: ContentType.Teachers, text: 'Преподаватели' },
    { key: ContentType.Students, text: 'Студенты' },
  ];
  ContentType = ContentType;
  valueIndex = 0;

  constructor(
    private readonly injector: Injector,
    private dialogs: TuiDialogService,
  ) {}

  ngOnInit() {
    this.addingTeacherDialog = this.dialogs.open<AddingTeacherContextData>(
      new PolymorpheusComponent(AddingTeacherComponent, this.injector),
      { data: { id: this.id } },
    );
  }

  handleAddTeacher() {
    this.addingTeacherDialog.pipe(take(1)).subscribe({
      next: () => {
        this.refetchDetails.emit();
      },
    });
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
}
