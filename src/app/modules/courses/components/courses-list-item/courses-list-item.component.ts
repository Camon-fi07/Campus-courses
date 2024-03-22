import { Component, Input, OnInit } from '@angular/core';
import { CourseModel, CourseStatuses } from 'shared/types/courses';
import { translateCourseStatus, translateSemester } from 'shared/utils/translate';

@Component({
  selector: 'courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrl: './courses-list-item.component.scss',
})
export class CoursesListItemComponent implements OnInit {
  @Input({ required: true }) courseInfo!: CourseModel;
  semester!: string;
  status!: string;

  get statusColor() {
    switch (this.courseInfo.status) {
      case CourseStatuses.Created:
        return 'var(--tui-neutral-fill)';
      case CourseStatuses.Finished:
        return 'var(--tui-negative)';
      case CourseStatuses.OpenForAssigning:
        return 'var(--tui-positive)';
      case CourseStatuses.Started:
        return 'var(--tui-link)';
      default:
        return 'unset';
    }
  }

  ngOnInit() {
    this.semester = translateSemester(this.courseInfo.semester);
    this.status = translateCourseStatus(this.courseInfo.status);
  }
}
