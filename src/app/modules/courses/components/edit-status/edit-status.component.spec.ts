import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { CoursesModule } from 'modules/courses/courses.module';
import { EditStatusComponent } from './edit-status.component';

describe('EditStatusComponent', () => {
  let component: EditStatusComponent;
  let fixture: ComponentFixture<EditStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule, PolymorpheusModule],
      providers: [
        HttpClient,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: { data: { id: '123', status: 'Created' } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
