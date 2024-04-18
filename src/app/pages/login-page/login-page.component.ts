import { Component } from '@angular/core';
import { AuthModule } from '../../modules/auth/auth.module';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
