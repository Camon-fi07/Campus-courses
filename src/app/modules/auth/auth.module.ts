import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import { EMAIL_ERROR, REQUIRED_ERROR } from 'shared/constants/errors';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
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
    TuiTextfieldControllerModule,
    TuiInputDateModule,
    TuiAlertModule,
  ],
  exports: [RegistrationComponent, LoginComponent],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        email: EMAIL_ERROR,
        required: REQUIRED_ERROR,
      },
    },
    AuthService,
  ],
})
export class AuthModule {}
