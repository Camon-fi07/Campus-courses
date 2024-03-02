import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import { UserService } from 'core/services/user.service';
import { matchPasswordsValidator, passwordValidator } from 'shared/utils/validators';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  formGroup!: FormGroup;
  isLoading = false;
  error: string | null = null;
  dateNow = new Date();
  maxDate = new TuiDay(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate());

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
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
      const inputDate: TuiDay = this.formGroup.controls['birthDate'].value;
      const date = new Date(inputDate.year, inputDate.month, inputDate.day);
      this.userService
        .registration({ ...this.formGroup.value, birthDate: date.toISOString() })
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: (e) => {
            this.isLoading = false;
            this.error = e;
          },
        });
    }
  }
}
