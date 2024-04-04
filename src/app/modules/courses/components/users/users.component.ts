import { Component, Input } from '@angular/core';
import { StudentShort, TeacherShort } from 'shared/types/user';
import { ContentType } from './users.types';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  @Input({ required: true }) teachers!: TeacherShort[];
  @Input({ required: true }) students!: StudentShort[];
  @Input({ required: true }) id!: string;
  @Input({ required: true }) isUserCanEdit!: boolean;

  tabVariants = [
    { key: ContentType.Teachers, text: 'Преподаватели' },
    { key: ContentType.Students, text: 'Студенты' },
  ];
  ContentType = ContentType;
  valueIndex = 0;
}
