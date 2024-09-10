import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GroupModule } from 'modules/group/group.module';
import { GroupCoursesComponent } from './group-courses.component';

describe('GroupCoursesComponent', () => {
  let component: GroupCoursesComponent;
  let fixture: ComponentFixture<GroupCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupModule, HttpClientModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display edit button if user is admin', () => {
    component.isAdmin = true;
    fixture.detectChanges();
    const adminPanel = fixture.debugElement.query(By.css('[data-test="edit-button"]'));
    expect(adminPanel).toBeTruthy();
  });

  it('should not display edit button if user is not admin', () => {
    component.isAdmin = false;
    fixture.detectChanges();
    const adminPanel = fixture.debugElement.query(By.css('[data-test="edit-button"]'));
    expect(!adminPanel).toBeTruthy();
  });
});
