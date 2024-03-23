import { Routes } from '@angular/router';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { TeachingCoursesComponent } from './pages/teaching-courses/teaching-courses.component';

export const coursesRoutes: Routes = [
  { path: 'my', component: MyCoursesComponent },
  { path: 'teaching', component: TeachingCoursesComponent },
];
