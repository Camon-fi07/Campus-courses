import { Component } from '@angular/core';
import { AuthModule } from 'modules/auth/auth.module';

@Component({
  selector: 'registration-page',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {}
