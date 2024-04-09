import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupCoursesComponent } from './group-courses.component';

describe('GroupCoursesComponent', () => {
  let component: GroupCoursesComponent;
  let fixture: ComponentFixture<GroupCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCoursesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
