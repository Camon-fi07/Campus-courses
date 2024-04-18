import { CommonModule, NgForOfContext } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputYearModule,
  TuiRadioBlockModule,
} from '@taiga-ui/kit';
import { QuillModule } from 'ngx-quill';
import { Observable, Subject, of, startWith, switchMap, take } from 'rxjs';
import { API_PATHS } from 'shared/constants/apiPaths';
import { translateSemester } from 'shared/utils';
import { CourseDetailsFormData } from './course-details.types';
@Component({
  selector: 'course-details-form',
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
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
  ],
  templateUrl: './course-details-form.component.html',
  styleUrl: './course-details-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsFormComponent implements OnInit {
  formGroup!: FormGroup;
  readonly search = new Subject<string | null>();
  originUsers: UserShortDto[] = [];
  @Input() initValues?: EditCourseDto;
  @Output() emitSubmit = new EventEmitter<CourseDetailsFormData>();

  users!: Observable<UserShortDto[] | null>;

  semestersVariants: Semesters[] = ['Autumn', 'Spring'];

  semesters = this.semestersVariants.reduce(
    (prevValue, curValue) => ({ ...prevValue, [curValue]: translateSemester(curValue) }),
    {},
  );

  convertUser = (user: UserShortDto) => user?.fullName || '';

  convertAsyncUser = (data: NgForOfContext<UserShortDto>) => this.convertUser(data.$implicit);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      startYear: new FormControl<number>(2024, Validators.required),
      maximumStudentsCount: new FormControl<number>(10, Validators.required),
      semester: new FormControl<Semesters>('Autumn'),
      requirements: new FormControl('', Validators.required),
      annotations: new FormControl('', Validators.required),
      mainTeacher: new FormControl<UserShortDto | null>(null, Validators.required),
    });

    this.getUsers()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.originUsers = res;
          this.users = this.search.pipe(
            switchMap((search) => of(this.filterUsers(search))),
            startWith(this.originUsers.filter((_, index) => index < 50)),
          );

          if (this.initValues) {
            const { mainTeacherId, ...initValuesWithoutTeacher } = this.initValues;
            const mainTeacher = this.originUsers.find((user) => user.id === mainTeacherId) || null;
            this.formGroup.setValue({ ...initValuesWithoutTeacher, mainTeacher });
          }
        },
      });
  }

  handleSearchUserInput(value: string | null) {
    this.search.next(value);
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
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const mainTeacherId = this.formGroup.value.mainTeacher.id;
      this.emitSubmit.emit({ ...this.formGroup.value, mainTeacherId });
    }
  }
}
