import { Component } from '@angular/core';
import { CoursesModule } from 'modules/courses/courses.module';

@Component({
  selector: 'courses-page',
  standalone: true,
  imports: [CoursesModule],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
})
export class CoursesPageComponent {}
