import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value.password === control.value.passwordRepeat ? null : { passwordMatch: true };
};
