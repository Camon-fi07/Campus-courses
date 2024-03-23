import { Routes } from '@angular/router';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { TeachingCoursesComponent } from './pages/teaching-courses/teaching-courses.component';

export const coursesRoutes: Routes = [
  { path: 'my', component: MyCoursesComponent },
  { path: 'teaching', component: TeachingCoursesComponent },
  { path: ':id', component: CourseDetailsComponent },
];
