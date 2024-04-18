import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesModule } from 'modules/courses/courses.module';
import { CourseShortInfoComponent } from './course-short-info.component';

describe('CourseShortInfoComponent', () => {
  let component: CourseShortInfoComponent;
  let fixture: ComponentFixture<CourseShortInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseShortInfoComponent);
    component = fixture.componentInstance;
    component.annotations = '';
    component.requirements = '';
    component.notifications = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
