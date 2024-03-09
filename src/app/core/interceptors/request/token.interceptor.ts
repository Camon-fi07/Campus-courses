import { HttpInterceptorFn } from '@angular/common/http';
import { getCookieValue } from 'shared/utils';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getCookieValue('token');
  if (token) {
    req.headers.append('Authorization', `Bearer ${token}`);
  }
  return next(req);
};
