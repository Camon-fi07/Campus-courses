import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { CoursesModule } from 'modules/courses/courses.module';
import { CreatingNotificationComponent } from './creating-notification.component';

describe('CreatingNotificationComponent', () => {
  let component: CreatingNotificationComponent;
  let fixture: ComponentFixture<CreatingNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule, PolymorpheusModule],
      providers: [
        HttpClient,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: { data: { id: '123' } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatingNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('notification text required', () => {
    component.formGroup.controls['text'].setValue('');
    expect(component.formGroup.controls['text'].valid).toBeFalsy();
  });
});
