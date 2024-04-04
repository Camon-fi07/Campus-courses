import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdaptiveTabsComponent } from './adaptive-tabs.component';

describe('AdaptiveTabsComponent', () => {
  let component: AdaptiveTabsComponent;
  let fixture: ComponentFixture<AdaptiveTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdaptiveTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdaptiveTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
