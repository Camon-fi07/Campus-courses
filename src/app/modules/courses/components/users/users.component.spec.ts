import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesModule } from 'modules/courses/courses.module';
import { UsersComponent } from './users.component';

const TEACHER_MOCK_DATA: TeacherShort[] = [
  { email: '213', isMain: true, name: '123' },
  { email: '214', isMain: false, name: '1235' },
];

const STUDENTS_MOCK_DATA: StudentShort[] = [
  { email: '213', name: '123', id: '1', status: 'Accepted', finalResult: 'Failed', midtermResult: 'Passed' },
  { email: '214', name: '1235', id: '2', status: 'Accepted', finalResult: 'Failed', midtermResult: 'Passed' },
];

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    component.id = '';
    component.students = STUDENTS_MOCK_DATA;
    component.teachers = TEACHER_MOCK_DATA;
    component.isUserCanAddTeacher = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the add teacher button if there is a right', () => {
    component.isUserCanAddTeacher = true;
    const teacherAddingButton = fixture.debugElement.query(By.css('[data-test="teacher-adding"]'));
    expect(!!teacherAddingButton).toBeTruthy();
  });

  it('should hide the add teacher button if there is a right', () => {
    component.isUserCanAddTeacher = false;
    fixture.detectChanges();
    const teacherAddingButton = fixture.debugElement.query(By.css('[data-test="teacher-adding"]'));
    expect(!!teacherAddingButton).toBeFalsy();
  });

  it('should display teachers list', () => {
    component.valueIndex = 0;
    fixture.detectChanges();
    const countOfItems = fixture.debugElement.queryAll(By.css('[data-test="teachers-list"]')).length;
    expect(countOfItems === TEACHER_MOCK_DATA.length).toBeTruthy();
  });

  it('should display students list', () => {
    component.valueIndex = 1;
    fixture.detectChanges();
    const countOfItems = fixture.debugElement.queryAll(By.css('[data-test="students-list"]')).length;
    expect(countOfItems === STUDENTS_MOCK_DATA.length).toBeTruthy();
  });
});
