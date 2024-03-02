import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiButtonModule, TuiErrorModule, TuiLabelModule, TuiLinkModule } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { EMAIL_ERROR, REQUIRED_ERROR } from 'shared/constants/errors';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiLinkModule,
    RouterLink,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiLabelModule,
    TuiErrorModule,
  ],
  exports: [AuthComponent],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        email: EMAIL_ERROR,
        required: REQUIRED_ERROR,
      },
    },
  ],
})
export class AuthModule {}
