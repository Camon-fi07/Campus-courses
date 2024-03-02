import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'core/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup!: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
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
          this.error = e;
          this.isLoading = false;
        },
      });
    }
  }
}
