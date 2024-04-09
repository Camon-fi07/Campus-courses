import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { CoursesModule } from 'modules/courses/courses.module';
import { EditMarkComponent } from './edit-mark.component';

describe('EditMarkComponent', () => {
  let component: EditMarkComponent;
  let fixture: ComponentFixture<EditMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule, PolymorpheusModule],
      providers: [
        HttpClient,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: { data: { studentName: '', courseId: '', studentId: 'string', markType: 'Final' } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
