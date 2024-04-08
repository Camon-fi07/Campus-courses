import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiTextareaModule,
  TuiToggleModule,
  TuiFieldErrorPipeModule,
  TuiRadioListModule,
  TuiBadgeModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
} from '@taiga-ui/kit';
import { AdaptiveTabsComponent } from 'components/adaptive-tabs/adaptive-tabs.component';
import { CourseDetailsFormComponent } from 'components/course-details-form/course-details-form.component';
import { CoursesListComponent } from 'components/courses-list/courses-list.component';
import { QuillModule } from 'ngx-quill';
import { AddingTeacherComponent } from './components/adding-teacher/adding-teacher.component';
import { CourseShortInfoComponent } from './components/course-short-info/course-short-info.component';
import { CreatingNotificationComponent } from './components/creating-notification/creating-notification.component';
import { EditMarkComponent } from './components/edit-mark/edit-mark.component';
import { EditStatusComponent } from './components/edit-status/edit-status.component';
import { EditingCourseComponent } from './components/editing-course/editing-course.component';
import { MainDataComponent } from './components/main-data/main-data.component';
import { RequireAndAnnotationEditComponent } from './components/require-and-annotation-edit/require-and-annotation-edit.component';
import { StudentComponent } from './components/student/student.component';
import { UsersComponent } from './components/users/users.component';
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
    EditStatusComponent,
    RequireAndAnnotationEditComponent,
    UsersComponent,
    AddingTeacherComponent,
    StudentComponent,
    EditMarkComponent,
    MainDataComponent,
  ],
  imports: [
    TuiTextfieldControllerModule,
    FormsModule,
    CommonModule,
    TuiDataListModule,
    RouterOutlet,
    TuiLoaderModule,
    RouterLink,
    CoursesListComponent,
    TuiButtonModule,
    TuiTextareaModule,
    TuiDialogModule,
    TuiRadioListModule,
    ReactiveFormsModule,
    TuiToggleModule,
    TuiLabelModule,
    TuiSvgModule,
    CourseDetailsFormComponent,
    QuillModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiBadgeModule,
    AdaptiveTabsComponent,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
  ],
  providers: [provideRouter(coursesRoutes), CoursesService],
  exports: [CoursesComponent],
})
export class CoursesModule {}
