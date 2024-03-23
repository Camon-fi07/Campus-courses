import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'modules/courses/services/courses.service';
import { take } from 'rxjs';
import { CourseDetails } from 'shared/types/courses';

@Component({
  selector: 'course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails!: CourseDetails;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    let id = '';
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      id = params['id'];
    });

    this.coursesService.getCourseDetails(id).subscribe((res) => {
      this.courseDetails = res;
    });
  }
}
