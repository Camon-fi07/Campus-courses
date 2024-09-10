import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GroupModule } from 'modules/group/group.module';
import { GroupCardComponent } from './group-card.component';

describe('GroupCardComponent', () => {
  let component: GroupCardComponent;
  let fixture: ComponentFixture<GroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCardComponent);
    component = fixture.componentInstance;
    component.group = { id: '1233412', name: 'name' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display control panel if user is admin', () => {
    component.isAdmin = true;
    fixture.detectChanges();
    const adminPanel = fixture.debugElement.query(By.css('[data-test="admin-panel"]'));
    expect(adminPanel).toBeTruthy();
  });

  it('should not display control panel if user is not admin', () => {
    component.isAdmin = false;
    fixture.detectChanges();
    const adminPanel = fixture.debugElement.query(By.css('[data-test="admin-panel"]'));
    expect(!adminPanel).toBeTruthy();
  });
});
