import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { UserService } from 'core/services/user.service';
import { passwordValidator } from 'shared/utils/validators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
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
      this.userService.login(this.formGroup.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (e) => {
          this.alerts.open(e.message, { label: 'Произошла ошибка', status: 'error' }).subscribe();
          this.isLoading = false;
        },
      });
    }
  }
}
