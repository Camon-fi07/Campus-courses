import { Component } from '@angular/core';
import { AuthModule } from '../../modules/auth/auth.module';

@Component({
  selector: 'auth-page',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {}
