import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { CoursesListComponent } from 'components/courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';
import { coursesRoutes } from './courses.routes';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { TeachingCoursesComponent } from './pages/teaching-courses/teaching-courses.component';
import { CoursesService } from './services/courses.service';

@NgModule({
  declarations: [CoursesComponent, MyCoursesComponent, TeachingCoursesComponent, CourseDetailsComponent],
  imports: [CommonModule, RouterOutlet, TuiLoaderModule, RouterLink, CoursesListComponent, TuiButtonModule],
  providers: [provideRouter(coursesRoutes), CoursesService],
  exports: [CoursesComponent],
})
export class CoursesModule {}
