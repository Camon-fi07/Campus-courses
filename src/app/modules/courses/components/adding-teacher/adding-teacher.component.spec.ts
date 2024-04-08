import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { CoursesModule } from 'modules/courses/courses.module';
import { AddingTeacherComponent } from './adding-teacher.component';

describe('AddingTeacherComponent', () => {
  let component: AddingTeacherComponent;
  let fixture: ComponentFixture<AddingTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule, HttpClientModule, PolymorpheusModule],
      providers: [HttpClient, { provide: POLYMORPHEUS_CONTEXT, useValue: { data: { id: '212' } } }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddingTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
