import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'core/services/user/user.service';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return next(req).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          userService.deleteUser();
          router.navigate(['/login']);
        }
      },
    }),
  );
};
