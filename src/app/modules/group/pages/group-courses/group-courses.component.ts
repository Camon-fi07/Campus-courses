import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { CourseDetailsFormData } from 'components/course-details-form/course-details.types';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { APIGroupsService } from 'core/API/requests/apigroups.service';
import { UserStateService } from 'core/services/userState.service';
import { Subject, Subscription, finalize, take, takeUntil } from 'rxjs';

@Component({
  selector: 'group-courses',
  templateUrl: './group-courses.component.html',
  styleUrl: './group-courses.component.scss',
})
export class GroupCoursesComponent implements OnInit, OnDestroy {
  isAdmin = false;
  id!: string;
  courses: CourseModel[] = [];
  isLoading = true;
  private unsubscribe = new Subject<void>();
  private creatingFormDialog?: Subscription;

  constructor(
    private userStateService: UserStateService,
    private APIGroupsService: APIGroupsService,
    private APICoursesService: APICoursesService,
    private activatedRoute: ActivatedRoute,
    private readonly dialogs: TuiDialogService,
  ) {}

  ngOnInit() {
    this.userStateService.userRoles.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.isAdmin = res?.isAdmin ?? false;
      },
    });
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.id = params['id'];
    });
    this.fetchCourses();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  fetchCourses() {
    this.isLoading = true;
    this.APIGroupsService.getGroupCourses(this.id)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (res) => {
          this.courses = res;
        },
      });
  }

  handleCreateCourse(content: PolymorpheusContent<TuiDialogContext>) {
    this.creatingFormDialog = this.dialogs.open(content).subscribe();
  }

  handleSubmitCreatingCourse(data: CourseDetailsFormData) {
    this.APICoursesService.createCourse(this.id, data).subscribe({
      next: () => {
        this.fetchCourses();
        this.creatingFormDialog?.unsubscribe();
      },
    });
  }
}
