import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesModule } from 'modules/courses/courses.module';
import { MockComponent } from 'ng-mocks';
import { QuillEditorComponent } from 'ngx-quill';
import { RequireAndAnnotationEditComponent } from './require-and-annotation-edit.component';

describe('RequireAndAnnotationEditComponent', () => {
  let component: RequireAndAnnotationEditComponent;
  let fixture: ComponentFixture<RequireAndAnnotationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule],
      declarations: [MockComponent(QuillEditorComponent)],
    }).compileComponents();

    fixture = TestBed.createComponent(RequireAndAnnotationEditComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
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
