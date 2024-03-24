import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from 'shared/constants/routes';
import { CourseModel } from 'shared/types/courses';
import { translateCourseStatus, translateSemester, getStatusColor } from 'shared/utils';

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
  getStatusColor = getStatusColor;
}
