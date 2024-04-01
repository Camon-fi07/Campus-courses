import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { EditingCourseComponent } from 'modules/courses/components/editing-course/editing-course.component';
import { CoursesService } from 'modules/courses/services/courses.service';
import { EditCourseContextData } from 'modules/courses/types/EditCourseContextData';
import { Observable, take } from 'rxjs';
import { CourseDetails } from 'shared/types/courses';
import { translateSemester, translateCourseStatus, getStatusColor } from 'shared/utils';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails!: CourseDetails;
  translateCourseStatus = translateCourseStatus;
  translateSemester = translateSemester;
  getStatusColor = getStatusColor;
  id!: string;
  private dialog!: Observable<EditCourseContextData>;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private dialogs: TuiDialogService,
    private readonly injector: Injector,
  ) {}

  fetchDetails() {
    this.coursesService
      .getCourseDetails(this.id)
      .pipe(take(1))
      .subscribe((res) => {
        this.courseDetails = res;
        this.dialog = this.dialogs.open<EditCourseContextData>(
          new PolymorpheusComponent(EditingCourseComponent, this.injector),
          {
            data: this.convertCourseDetails(),
          },
        );
      });
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.id = params['id'];
    });
    this.fetchDetails();
  }

  convertCourseDetails(): EditCourseContextData {
    const { id, name, requirements, annotations, maximumStudentsCount, semester, startYear } = this.courseDetails!;

    return { id, annotations, name, maximumStudentsCount, requirements, semester, startYear, mainTeacherId: '' };
  }

  handleEditCourse() {
    this.dialog.pipe(take(1)).subscribe({
      next: () => {
        this.fetchDetails();
      },
    });
  }
}
