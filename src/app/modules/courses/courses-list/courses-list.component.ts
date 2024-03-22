import { Component, Input } from '@angular/core';
import { CourseModel } from 'shared/types/courses';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input({ required: true }) courses!: CourseModel[];
}
