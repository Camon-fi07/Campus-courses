import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesModule } from 'modules/courses/courses.module';
import { TeachingCoursesComponent } from './teaching-courses.component';

describe('TeachingCoursesComponent', () => {
  let component: TeachingCoursesComponent;
  let fixture: ComponentFixture<TeachingCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(TeachingCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
