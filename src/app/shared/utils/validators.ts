import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PASSWORD_DIGIT_ERROR, PASSWORD_MATCH_ERROR } from 'shared/constants/errors';
import { PASSWORD_REG } from 'shared/constants/regex';

export const matchPasswordsValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { passwordMatch: PASSWORD_MATCH_ERROR };
};

export const passwordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return PASSWORD_REG.test(control.value) ? null : { passwordFormat: PASSWORD_DIGIT_ERROR };
};
