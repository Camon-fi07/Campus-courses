import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from 'shared/constants/routes';
import { CourseModel, CourseStatuses } from 'shared/types/courses';
import { translateCourseStatus, translateSemester } from 'shared/utils/translate';

@Component({
  selector: 'courses-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input({ required: true }) courses!: CourseModel[];
  ROUTES = ROUTES;

  translateSemester = translateSemester;
  translateCourseStatus = translateCourseStatus;

  getStatusColor(status: CourseStatuses) {
    switch (status) {
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
}
