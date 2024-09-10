import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesModule } from 'modules/courses/courses.module';
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
    component.status = 'Created';
    component.isUserCanEdit = false;
    component.startYear = 0;
    component.semester = 'Autumn';
    component.maximumStudentsCount = 1;
    component.studentsEnrolledCount = 1;
    component.studentsInQueueCount = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show editing button', () => {
    component.isUserCanEdit = true;
    fixture.detectChanges();
    const editingButton = fixture.debugElement.query(By.css('[data-test="edit-course"]'));
    expect(!!editingButton).toBeTruthy();
  });

  it('should show sign up button', () => {
    component.isUserCanEdit = false;
    component.isUserSignUp = false;
    component.status = 'OpenForAssigning';
    fixture.detectChanges();
    const signUpButton = fixture.debugElement.query(By.css('[data-test="sign-up"]'));
    expect(!!signUpButton).toBeTruthy();
  });
});
