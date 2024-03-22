import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'modules/courses/services/courses.service';
import { take } from 'rxjs';
import { CourseModel } from 'shared/types/courses';

@Component({
  selector: 'my-courses',
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
})
export class MyCoursesComponent implements OnInit {
  courses!: CourseModel[];

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.coursesService
      .getMyCourses()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.courses = res;
        },
      });
  }
}
