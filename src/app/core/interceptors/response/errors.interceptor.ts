import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { take, tap } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const alerts = inject(TuiAlertService);

  return next(req).pipe(
    tap({
      error: (err: HttpErrorResponse) =>
        alerts.open(err.message, { label: 'Произошла ошибка', status: 'error' }).pipe(take(1)).subscribe(),
    }),
  );
};
