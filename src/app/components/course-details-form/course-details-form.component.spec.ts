import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuillModule } from 'ngx-quill';
import { CourseDetailsFormComponent } from './course-details-form.component';

describe('CourseDetailsFormComponent', () => {
  let component: CourseDetailsFormComponent;
  let fixture: ComponentFixture<CourseDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailsFormComponent, HttpClientModule, QuillModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
