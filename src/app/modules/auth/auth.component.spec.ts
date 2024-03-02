import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthModule } from './auth.module';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientModule],
      providers: [
        HttpClient,
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate required email', () => {
    component.formGroup.controls['email'].setValue('');
    expect(component.formGroup.controls['email'].valid).toEqual(false);
  });

  it('should validate format email', () => {
    component.formGroup.controls['email'].setValue('awddawf');
    expect(component.formGroup.controls['email'].valid).toEqual(false);
  });

  it('should be right email', () => {
    component.formGroup.controls['email'].setValue('user@example.com');
    expect(component.formGroup.controls['email'].valid).toEqual(true);
  });

  it('should validate required password', () => {
    component.formGroup.controls['password'].setValue('');
    expect(component.formGroup.controls['password'].valid).toEqual(false);
  });

  it('should be right password', () => {
    component.formGroup.controls['password'].setValue('fwaf24');
    expect(component.formGroup.controls['password'].valid).toEqual(true);
  });
});
