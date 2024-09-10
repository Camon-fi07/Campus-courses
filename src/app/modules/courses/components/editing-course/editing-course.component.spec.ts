import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { CourseDetailsFormComponent } from 'components/course-details-form/course-details-form.component';
import { CoursesModule } from 'modules/courses/courses.module';
import { CourseUserRoles } from 'modules/courses/types/CourseUserRoles';
import { EditCourseContextData } from 'modules/courses/types/EditCourseContextData';
import { MockComponent } from 'ng-mocks';
import { RequireAndAnnotationEditComponent } from '../require-and-annotation-edit/require-and-annotation-edit.component';
import { EditingCourseComponent } from './editing-course.component';

const EDIT_COURSE_DATA_MOCK: EditCourseContextData = {
  id: '123',
  userRole: CourseUserRoles.Admin,
  name: 'string',
  startYear: 12,
  maximumStudentsCount: 12,
  semester: 'Autumn',
  requirements: 'string',
  annotations: 'string',
  mainTeacherId: 'string',
};

describe('EditingCourseComponent', () => {
  let component: EditingCourseComponent;
  let fixture: ComponentFixture<EditingCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, CoursesModule, HttpClientModule, PolymorpheusModule],
      declarations: [MockComponent(RequireAndAnnotationEditComponent), MockComponent(CourseDetailsFormComponent)],
      providers: [
        HttpClient,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: { data: EDIT_COURSE_DATA_MOCK, completeWith: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display editing course details if user is admin ', () => {
    component.userRole = CourseUserRoles.Admin;
    fixture.detectChanges();
    const editingCourseDetails = fixture.debugElement.query(By.css('[data-test="edit-course-details"]'));
    expect(!!editingCourseDetails).toBeTruthy();
  });

  it('should display editing require and annotation if user is teacher', () => {
    component.userRole = CourseUserRoles.Teacher;
    fixture.detectChanges();
    const editingCourseDetails = fixture.debugElement.query(By.css('[data-test="edit-course-require-and-annotation"]'));
    expect(!!editingCourseDetails).toBeTruthy();
  });

  it('should display editing require and annotation if user is main teacher', () => {
    component.userRole = CourseUserRoles.MainTeacher;
    fixture.detectChanges();
    const editingCourseDetails = fixture.debugElement.query(By.css('[data-test="edit-course-require-and-annotation"]'));
    expect(!!editingCourseDetails).toBeTruthy();
  });

  it('shouldn not display editing information if do not have rights', () => {
    component.userRole = CourseUserRoles.Student;
    fixture.detectChanges();
    const isEditingCourseDetailsShown = fixture.debugElement.query(
      By.css('[data-test="edit-course-require-and-annotation"]'),
    );

    const isEditingCourseRequireAndAnnotationShown = fixture.debugElement.query(
      By.css('[data-test="edit-course-require-and-annotation"]'),
    );
    expect(!isEditingCourseDetailsShown && !isEditingCourseRequireAndAnnotationShown).toBeTruthy();
  });
});
