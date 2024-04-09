import { NgForOfContext } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { APICoursesService } from 'core/API/requests/apicourses.service';
import { Observable, Subject, of, startWith, switchMap, take } from 'rxjs';
import { API_PATHS } from 'shared/constants/apiPaths';

@Component({
  selector: 'adding-teacher',
  templateUrl: './adding-teacher.component.html',
  styleUrl: './adding-teacher.component.scss',
})
export class AddingTeacherComponent implements OnInit {
  formGroup!: FormGroup;
  originUsers: UserShortDto[] = [];
  users!: Observable<UserShortDto[] | null>;
  isLoading = false;
  readonly search = new Subject<string | null>();

  convertUser = (user: UserShortDto) => user?.fullName || '';

  convertAsyncUser = (data: NgForOfContext<UserShortDto>) => this.convertUser(data.$implicit);

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, { id: string }>,
    private APICoursesService: APICoursesService,
    private http: HttpClient,
  ) {
    this.formGroup = fb.group({ teacher: new FormControl<TeacherShort | null>(null) });
  }

  ngOnInit() {
    this.getUsers()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.originUsers = res;
          this.users = this.search.pipe(
            switchMap((search) => of(this.filterUsers(search))),
            startWith(this.originUsers.filter((_, index) => index < 50)),
          );
        },
      });
  }

  filterUsers(searchQuery: string | null) {
    return this.originUsers.filter(
      (user, index) => user.fullName.toLowerCase().includes(searchQuery?.toLowerCase() || '') && index < 50,
    );
  }

  getUsers() {
    return this.http.get<UserShortDto[]>(API_PATHS.USERS);
  }

  handleSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      const { id } = this.formGroup.value.teacher;
      this.APICoursesService.addCourseTeacher(this.context.data.id, { userId: id })
        .pipe(take(1))
        .subscribe({
          next: () => this.context.completeWith(),
          error: () => {
            this.isLoading = false;
          },
        });
    }
  }

  handleSearchUserInput(value: string | null) {
    this.search.next(value);
  }
}
