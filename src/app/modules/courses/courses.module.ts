import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import { TuiLoaderModule } from '@taiga-ui/core';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { CoursesComponent } from './courses.component';
import { coursesRoutes } from './courses.routes';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { CoursesService } from './services/courses.service';

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CoursesListItemComponent, MyCoursesComponent],
  imports: [CommonModule, RouterOutlet, TuiLoaderModule, RouterLink],
  providers: [provideRouter(coursesRoutes), CoursesService],
  exports: [CoursesListComponent, CoursesComponent],
})
export class CoursesModule {}
