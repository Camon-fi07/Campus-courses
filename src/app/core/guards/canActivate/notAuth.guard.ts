import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'core/services/user.service';

export const notAuthGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuth = userService.getIsAuth();
  if (isAuth.value) router.navigate(['']);
  return !isAuth.value;
};
