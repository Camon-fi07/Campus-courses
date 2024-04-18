import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { CoursesModule } from 'modules/courses/courses.module';
import { CourseUserRoles } from 'modules/courses/types/CourseUserRoles';
import { EditingCourseComponent } from './editing-course.component';

describe('EditingCourseComponent', () => {
  let component: EditingCourseComponent;
  let fixture: ComponentFixture<EditingCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule, PolymorpheusModule],
      providers: [
        HttpClient,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: { data: { id: '123', userRole: CourseUserRoles.Admin } },
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
});
