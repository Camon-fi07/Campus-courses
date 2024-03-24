import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import { TuiButtonModule, TuiDataListModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiSelectModule, TuiTabsModule } from '@taiga-ui/kit';
import { CoursesListComponent } from 'components/courses-list/courses-list.component';
import { CourseShortInfoComponent } from './components/course-short-info/course-short-info.component';
import { CoursesComponent } from './courses.component';
import { coursesRoutes } from './courses.routes';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { TeachingCoursesComponent } from './pages/teaching-courses/teaching-courses.component';
import { CoursesService } from './services/courses.service';

@NgModule({
  declarations: [
    CourseShortInfoComponent,
    CoursesComponent,
    MyCoursesComponent,
    TeachingCoursesComponent,
    CourseDetailsComponent,
  ],
  imports: [
    TuiTextfieldControllerModule,
    FormsModule,
    CommonModule,
    TuiDataListModule,
    TuiSelectModule,
    TuiTabsModule,
    CommonModule,
    RouterOutlet,
    TuiLoaderModule,
    RouterLink,
    CoursesListComponent,
    TuiButtonModule,
  ],
  providers: [provideRouter(coursesRoutes), CoursesService],
  exports: [CoursesComponent],
})
export class CoursesModule {}
