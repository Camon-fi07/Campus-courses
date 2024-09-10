import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GroupModule } from 'modules/group/group.module';
import { GroupsComponent } from './groups.component';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupModule, HttpClientModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display create button if user is admin', () => {
    component.isAdmin = true;
    fixture.detectChanges();
    const createButton = fixture.debugElement.query(By.css('[data-test="create-button"]'));
    expect(createButton).toBeTruthy();
  });

  it('should not display create button if user is not admin', () => {
    component.isAdmin = false;
    fixture.detectChanges();
    const createButton = fixture.debugElement.query(By.css('[data-test="create-button"]'));
    expect(!createButton).toBeTruthy();
  });
});
