import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule } from '@taiga-ui/kit';
import { EditCourseComponent } from 'components/edit-course/edit-course.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    TuiInputModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    TuiInputDateModule,
    TuiAlertModule,
    TuiLabelModule,
    EditCourseComponent,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
