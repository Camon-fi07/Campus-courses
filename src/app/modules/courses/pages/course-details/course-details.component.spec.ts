import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesModule } from 'modules/courses/courses.module';
import { CourseDetailsComponent } from './course-details.component';

const MOCK_COURSE_DETAILS: CourseDetails = {
  id: '1',
  name: 'Test course',
  startYear: 2021,
  maximumStudentsCount: 10,
  annotations: '',
  requirements: '',
  notifications: [],
  students: [],
  teachers: [],
  studentsEnrolledCount: 0,
  semester: 'Autumn',
  status: 'Created',
  studentsInQueueCount: 12,
};

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.courseDetails = MOCK_COURSE_DETAILS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display editing and deleting if user has rights', () => {
    component.isUserCanEdit = true;
    component.isLoading = false;
    fixture.detectChanges();
    const editCourseButton = fixture.debugElement.query(By.css('[data-test="edit-button"]'));
    const deleteCourseButton = fixture.debugElement.query(By.css('[data-test="delete-button"]'));

    expect(!!editCourseButton && !!deleteCourseButton).toBeTruthy();
  });

  it('should not display editing and deleting if user has not rights', () => {
    component.isUserCanEdit = false;
    component.isLoading = false;
    fixture.detectChanges();
    const editCourseButton = fixture.debugElement.query(By.css('[data-test="edit-button"]'));
    const deleteCourseButton = fixture.debugElement.query(By.css('[data-test="delete-button"]'));

    expect(!editCourseButton && !deleteCourseButton).toBeTruthy();
  });
});
