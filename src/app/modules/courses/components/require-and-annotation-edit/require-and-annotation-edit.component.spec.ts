import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesModule } from 'modules/courses/courses.module';
import { RequireAndAnnotationEditComponent } from './require-and-annotation-edit.component';

describe('RequireAndAnnotationEditComponent', () => {
  let component: RequireAndAnnotationEditComponent;
  let fixture: ComponentFixture<RequireAndAnnotationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RequireAndAnnotationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate requirement for required', () => {
    component.formGroup.controls['requirements'].setValue(null);
    expect(component.formGroup.controls['requirements'].invalid).toBeTruthy();
  });
});
