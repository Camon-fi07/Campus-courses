import { Component, OnInit } from '@angular/core';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { take } from 'rxjs';

@Component({
  selector: 'teaching-courses',
  templateUrl: './teaching-courses.component.html',
  styleUrl: './teaching-courses.component.scss',
})
export class TeachingCoursesComponent implements OnInit {
  courses!: CourseModel[];
  isLoading = true;

  constructor(private APICoursesService: APICoursesService) {}

  ngOnInit() {
    this.APICoursesService.getTeachingCourses()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.courses = res;
        },
      });
  }
}
