import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthService } from 'modules/auth/services/auth.service';
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
    private alerts: TuiAlertService,
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
      this.authService.login(this.formGroup.value).subscribe({
        next: () => {
          this.router.navigate([ROUTES.HOME]);
        },
        error: (e) => {
          this.alerts.open(e.message, { label: 'Произошла ошибка', status: 'error' }).subscribe();
          this.isLoading = false;
        },
      });
    }
  }
}
