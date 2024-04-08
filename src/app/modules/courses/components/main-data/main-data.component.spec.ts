import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesModule } from 'modules/courses/courses.module';
import { CourseStatuses, Semesters } from 'shared/types/courses';
import { MainDataComponent } from './main-data.component';

describe('MainDataComponent', () => {
  let component: MainDataComponent;
  let fixture: ComponentFixture<MainDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(MainDataComponent);
    component = fixture.componentInstance;

    component.courseId = '';
    component.status = CourseStatuses.Created;
    component.isUserCanEdit = false;
    component.startYear = 0;
    component.semester = Semesters.Autumn;
    component.maximumStudentsCount = 1;
    component.studentsEnrolledCount = 1;
    component.studentsInQueueCount = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
