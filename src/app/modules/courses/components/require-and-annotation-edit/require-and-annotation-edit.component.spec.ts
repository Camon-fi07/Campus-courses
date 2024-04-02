import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequireAndAnnotationEditComponent } from './require-and-annotation-edit.component';

describe('RequireAndAnnotationEditComponent', () => {
  let component: RequireAndAnnotationEditComponent;
  let fixture: ComponentFixture<RequireAndAnnotationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequireAndAnnotationEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequireAndAnnotationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
