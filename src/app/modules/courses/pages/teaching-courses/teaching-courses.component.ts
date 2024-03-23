import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'modules/courses/services/courses.service';
import { take } from 'rxjs';
import { CourseModel } from 'shared/types/courses';

@Component({
  selector: 'teaching-courses',
  templateUrl: './teaching-courses.component.html',
  styleUrl: './teaching-courses.component.scss',
})
export class TeachingCoursesComponent implements OnInit {
  courses!: CourseModel[];
  isLoading = true;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.coursesService
      .getTeachingCourses()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.courses = res;
        },
      });
  }
}
