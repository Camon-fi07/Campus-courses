import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditingCourseComponent } from './editing-course.component';

describe('EditingCourseComponent', () => {
  let component: EditingCourseComponent;
  let fixture: ComponentFixture<EditingCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditingCourseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
