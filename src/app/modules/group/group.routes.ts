import { Routes } from '@angular/router';
import { GroupCoursesComponent } from './pages/group-courses/group-courses.component';
import { GroupsComponent } from './pages/groups/groups.component';

export const groupRoutes: Routes = [
  { path: '', component: GroupsComponent },
  { path: ':id', component: GroupCoursesComponent },
];
