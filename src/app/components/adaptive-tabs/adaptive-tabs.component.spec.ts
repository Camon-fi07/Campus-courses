import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdaptiveTabsComponent } from './adaptive-tabs.component';
import { TabsVariants } from './adaptive-tabs.types';

const EXAMPLE_TABS: TabsVariants[] = [
  { key: 'first', text: 'first' },
  { key: 'second', text: 'second' },
];

describe('AdaptiveTabsComponent', () => {
  let component: AdaptiveTabsComponent;
  let fixture: ComponentFixture<AdaptiveTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdaptiveTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdaptiveTabsComponent);
    component = fixture.componentInstance;
    component.valueIndex = 0;
    component.tabsVariants = EXAMPLE_TABS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valueIndexChange should work', () => {
    component.handleChange(1);

    expect(component.valueIndex === 1).toBeTruthy();
  });
});
