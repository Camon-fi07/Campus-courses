import { Routes } from '@angular/router';
import { notAuthGuard } from 'core/guards/canActivate/notAuth.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export const routes: Routes = [
  { path: 'auth', component: AuthPageComponent, canActivate: [notAuthGuard] },
];
