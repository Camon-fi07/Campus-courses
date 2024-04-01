import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule, TuiTabsModule, TuiTextareaModule, TuiToggleModule } from '@taiga-ui/kit';
import { CourseDetailsFormComponent } from 'components/course-details-form/course-details-form.component';
import { CoursesListComponent } from 'components/courses-list/courses-list.component';
import { CourseShortInfoComponent } from './components/course-short-info/course-short-info.component';
import { CreatingNotificationComponent } from './components/creating-notification/creating-notification.component';
import { EditingCourseComponent } from './components/editing-course/editing-course.component';
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
    CreatingNotificationComponent,
    EditingCourseComponent,
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
    TuiTextareaModule,
    TuiDialogModule,
    ReactiveFormsModule,
    TuiToggleModule,
    TuiLabelModule,
    TuiSvgModule,
    CourseDetailsFormComponent,
  ],
  providers: [provideRouter(coursesRoutes), CoursesService],
  exports: [CoursesComponent],
})
export class CoursesModule {}
