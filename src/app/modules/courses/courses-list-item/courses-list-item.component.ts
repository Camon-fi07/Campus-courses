import { Component, Input, OnInit } from '@angular/core';
import { CourseModel } from 'shared/types/courses';
import { translateCourseStatus, translateSemester } from 'shared/utils/translate';

@Component({
  selector: 'courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrl: './courses-list-item.component.scss',
})
export class CoursesListItemComponent implements OnInit {
  @Input({ required: true }) courseInfo!: CourseModel;
  semester!: string;
  status!: string;

  ngOnInit() {
    this.semester = translateSemester(this.courseInfo.semester);
    this.status = translateCourseStatus(this.courseInfo.status);
  }
}
