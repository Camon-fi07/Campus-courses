import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesModule } from 'modules/courses/courses.module';
import { CourseStatuses, Semesters } from 'shared/types/courses';
import { CoursesListItemComponent } from './courses-list-item.component';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    component.courseInfo = {
      id: '123',
      maximumStudentsCount: 2,
      name: 'test',
      remainingSlotsCount: 5,
      semester: Semesters.Autumn,
      startYear: 5,
      status: CourseStatuses.Created,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
