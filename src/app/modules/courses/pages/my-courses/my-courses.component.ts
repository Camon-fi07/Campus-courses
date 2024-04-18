import { Component, OnInit } from '@angular/core';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { take } from 'rxjs';

@Component({
  selector: 'my-courses',
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
})
export class MyCoursesComponent implements OnInit {
  courses!: CourseModel[];
  isLoading = true;

  constructor(private APICoursesService: APICoursesService) {}

  ngOnInit() {
    this.APICoursesService.getMyCourses()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.courses = res;
        },
      });
  }
}
