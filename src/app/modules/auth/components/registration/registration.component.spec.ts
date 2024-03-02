import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthModule } from 'modules/auth/auth.module';
import { matchPasswordsValidator } from 'shared/utils/validators';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

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

    fixture = TestBed.createComponent(RegistrationComponent);
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

  it('should validate any digit password', () => {
    component.formGroup.controls['password'].setValue('string');
    expect(component.formGroup.controls['password'].valid).toEqual(false);
  });

  it('should validate length of password', () => {
    component.formGroup.controls['password'].setValue('24');
    expect(component.formGroup.controls['password'].valid).toEqual(false);
  });

  it('should be right password', () => {
    component.formGroup.controls['password'].setValue('hellow24');
    expect(component.formGroup.controls['password'].valid).toEqual(true);
  });

  it('should validate required birthDate', () => {
    component.formGroup.controls['birthDate'].setValue(null);
    expect(component.formGroup.controls['birthDate'].valid).toEqual(false);
  });

  it('should validate matching passwords', () => {
    component.formGroup.setValidators(matchPasswordsValidator);
    component.formGroup.controls['password'].setValue('fwaf24');
    component.formGroup.controls['confirmPassword'].setValue('fwaf');
    expect(component.formGroup.errors).not.toEqual(null);
  });

  it('should be right matching passwords', () => {
    component.formGroup.setValidators(matchPasswordsValidator);
    component.formGroup.controls['password'].setValue('fwaf24');
    component.formGroup.controls['confirmPassword'].setValue('fwaf24');
    expect(component.formGroup.errors).toEqual(null);
  });
});
