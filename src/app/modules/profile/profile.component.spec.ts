import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ProfileModule } from './profile.module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileModule, HttpClientModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate required birthDate', () => {
    component.formGroup.controls['birthDate'].setValue(null);
    expect(component.formGroup.controls['birthDate'].valid).toEqual(false);
  });

  it('should validate required fullName', () => {
    component.formGroup.controls['fullName'].setValue(null);
    expect(component.formGroup.controls['fullName'].valid).toEqual(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
