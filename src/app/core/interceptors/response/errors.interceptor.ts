import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { UserStateService } from 'core/services/userState.service';
import { take, tap } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const alerts = inject(TuiAlertService);
  const router = inject(Router);
  const userStateService = inject(UserStateService);

  return next(req).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          userStateService.deleteUser();
          router.navigate(['/login']);
        } else alerts.open(err.error.message, { label: 'Произошла ошибка', status: 'error' }).pipe(take(1)).subscribe();
      },
    }),
  );
};
