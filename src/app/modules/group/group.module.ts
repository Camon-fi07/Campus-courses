import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { ConfirmationDeleteComponent } from 'components/confirmation-delete/confirmation-delete.component';
import { CourseDetailsFormComponent } from 'components/course-details-form/course-details-form.component';
import { CoursesListComponent } from 'components/courses-list/courses-list.component';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { GroupComponent } from './group.component';
import { groupRoutes } from './group.routes';
import { GroupCoursesComponent } from './pages/group-courses/group-courses.component';
import { GroupsComponent } from './pages/groups/groups.component';

@NgModule({
  declarations: [GroupComponent, GroupCardComponent, ModalFormComponent, GroupsComponent, GroupCoursesComponent],
  imports: [
    CommonModule,
    TuiButtonModule,
    RouterLink,
    ReactiveFormsModule,
    TuiLabelModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiDialogModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    RouterOutlet,
    CoursesListComponent,
    CourseDetailsFormComponent,
    ConfirmationDeleteComponent,
  ],
  exports: [GroupComponent],
  providers: [provideRouter(groupRoutes)],
})
export class GroupModule {}
