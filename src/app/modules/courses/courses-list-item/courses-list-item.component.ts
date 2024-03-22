import { Component, Input } from '@angular/core';
import { CourseModel } from 'shared/types/courses';
import { translateCourseStatus, translateSemester } from 'shared/utils/translate';

@Component({
  selector: 'courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrl: './courses-list-item.component.scss',
})
export class CoursesListItemComponent {
  @Input({ required: true }) courseInfo!: CourseModel;
  semester = translateSemester(this.courseInfo.semester);
  status = translateCourseStatus(this.courseInfo.status);
}
