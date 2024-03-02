import { Routes } from '@angular/router';
import { notAuthGuard } from 'core/guards/canActivate/notAuth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  { path: 'auth', component: LoginPageComponent, canActivate: [notAuthGuard] },
];
