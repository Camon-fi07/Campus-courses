import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import { AuthService } from 'modules/auth/services/auth.service';
import { take } from 'rxjs';
import { ROUTES } from 'shared/constants/routes';
import { convertTuiDate, matchPasswordsValidator, passwordValidator } from 'shared/utils';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  formGroup!: FormGroup;
  isLoading = false;
  dateNow = new Date();
  maxDate = new TuiDay(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate());
  ROUTES = ROUTES;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formGroup = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl('', [Validators.required, passwordValidator]),
      birthDate: new FormControl<TuiDay | null>(null, Validators.required),
    });
  }

  handleSubmit() {
    this.formGroup.setValidators(matchPasswordsValidator);
    this.formGroup.updateValueAndValidity();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.authService
        .registration({
          ...this.formGroup.value,
          birthDate: convertTuiDate(this.formGroup.controls['birthDate'].value),
        })
        .pipe(take(1))
        .subscribe({
          next: () => this.router.navigate([ROUTES.HOME]),
          error: () => {
            this.isLoading = false;
          },
        });
    }
  }
}
