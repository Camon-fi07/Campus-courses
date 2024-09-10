import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoursesListComponent } from './courses-list.component';

const COURSES_MOCK: CourseModel[] = [
  {
    id: '1',
    maximumStudentsCount: 10,
    name: 'test',
    remainingSlotsCount: 4,
    semester: 'Spring',
    startYear: 2022,
    status: 'Created',
  },
];

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesListComponent, CommonModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    component.courses = COURSES_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display items', () => {
    const countOfItems = fixture.debugElement.queryAll(By.css('[data-test="course-item"]')).length;
    expect(countOfItems === COURSES_MOCK.length).toBeTruthy();
  });
});
