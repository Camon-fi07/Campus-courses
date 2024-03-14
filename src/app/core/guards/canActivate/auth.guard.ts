import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'core/services/user/user.service';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuth = userService.isAuth;
  if (!isAuth.value) router.navigate(['/login']);
  return isAuth.value;
};
