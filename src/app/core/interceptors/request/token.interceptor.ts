import { HttpInterceptorFn } from '@angular/common/http';
import { getCookieValue } from 'shared/utils';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getCookieValue('token');
  if (token) req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });

  return next(req);
};
