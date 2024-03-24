import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'modules/courses/services/courses.service';
import { take } from 'rxjs';
import { CourseDetails } from 'shared/types/courses';
import { translateSemester, translateCourseStatus, getStatusColor } from 'shared/utils';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails?: CourseDetails;
  translateCourseStatus = translateCourseStatus;
  translateSemester = translateSemester;
  getStatusColor = getStatusColor;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    let id = '';
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      id = params['id'];
    });

    this.coursesService
      .getCourseDetails(id)
      .pipe(take(1))
      .subscribe((res) => {
        this.courseDetails = res;
      });
  }
}
