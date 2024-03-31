import { CommonModule, NgForOfContext } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiGroupModule, TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputYearModule,
  TuiRadioBlockModule,
} from '@taiga-ui/kit';
import { QuillModule } from 'ngx-quill';
import { Observable, Subject, of, startWith, switchMap } from 'rxjs';
import { API_PATHS } from 'shared/constants/apiPaths';
import { Semesters } from 'shared/types/courses';
import { UserShortDto } from 'shared/types/user';
import { translateSemester } from 'shared/utils';

@Component({
  selector: 'edit-course',
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputYearModule,
    TuiRadioBlockModule,
    TuiGroupModule,
    TuiLabelModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    FormsModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss',
})
export class EditCourseComponent implements OnInit {
  formGroup!: FormGroup;
  readonly search = new Subject<string | null>();
  originUsers: UserShortDto[] = [];

  users!: Observable<UserShortDto[] | null>;

  semesters = Object.values(Semesters).reduce(
    (prevValue, curValue) => ({ ...prevValue, [curValue]: translateSemester(curValue) }),
    {},
  );

  convertUser = (user: UserShortDto) => user?.fullName || '';

  convertAsyncUser = (data: NgForOfContext<UserShortDto>) => this.convertUser(data.$implicit);
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getUsers().subscribe({
      next: (res) => {
        this.originUsers = res;
        this.users = this.search.pipe(
          switchMap((search) => of(this.filterUsers(search))),
          startWith(this.originUsers),
        );
      },
    });

    this.formGroup = this.fb.group({
      name: new FormControl(''),
      startYear: new FormControl<number>(2024),
      maximumStudentsCount: new FormControl<number>(10),
      semester: new FormControl<Semesters>(Semesters.Autumn),
      requirements: new FormControl(''),
      annotations: new FormControl(''),
      mainTeacherId: new FormControl<UserShortDto | null>(null),
    });
  }

  handleSearchUserInput(value: string | null) {
    this.search.next(value);
  }

  filterUsers(searchQuery: string | null) {
    return this.originUsers.filter((user) => user.fullName.toLowerCase().includes(searchQuery?.toLowerCase() || ''));
  }

  getUsers() {
    return this.http.get<UserShortDto[]>(API_PATHS.USERS);
  }
}
