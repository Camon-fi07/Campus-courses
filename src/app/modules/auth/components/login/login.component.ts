import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'modules/auth/services/auth.service';
import { take } from 'rxjs';
import { ROUTES } from 'shared/constants/routes';
import { passwordValidator } from 'shared/utils';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup!: FormGroup;
  isLoading = false;
  ROUTES = ROUTES;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator]),
    });
  }

  handleSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.authService
        .login(this.formGroup.value)
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
