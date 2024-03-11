import { Routes } from '@angular/router';
import { notAuthGuard } from 'core/guards/canActivate/notAuth.guard';
import { ProfilePageComponent } from 'pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from 'pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [notAuthGuard] },
  { path: 'registration', component: RegistrationPageComponent, canActivate: [notAuthGuard] },
  { path: 'profile', component: ProfilePageComponent },
];
