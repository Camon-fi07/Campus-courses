import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStateService } from 'core/services/userState.service';

export const authGuard: CanActivateFn = () => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  const isAuth = userStateService.isAuth;
  if (!isAuth.value) router.navigate(['/login']);
  return isAuth.value;
};
