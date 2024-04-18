import { Routes } from '@angular/router';
import { authGuard } from 'core/guards/canActivate/auth.guard';
import { notAuthGuard } from 'core/guards/canActivate/notAuth.guard';
import { CoursesPageComponent } from 'pages/courses-page/courses-page.component';
import { GroupPageComponent } from 'pages/group-page/group-page.component';
import { HomePageComponent } from 'pages/home-page/home-page.component';
import { ProfilePageComponent } from 'pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from 'pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [notAuthGuard] },
  { path: 'registration', component: RegistrationPageComponent, canActivate: [notAuthGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
  {
    path: 'groups',
    component: GroupPageComponent,
    loadChildren: () => import('modules/group/group.module').then((m) => m.GroupModule),
    canActivate: [authGuard],
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
    canActivate: [authGuard],
    loadChildren: () => import('modules/courses/courses.module').then((m) => m.CoursesModule),
  },
];
