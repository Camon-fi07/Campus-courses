import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddingTeacherComponent } from './adding-teacher.component';

describe('AddingTeacherComponent', () => {
  let component: AddingTeacherComponent;
  let fixture: ComponentFixture<AddingTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingTeacherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddingTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
