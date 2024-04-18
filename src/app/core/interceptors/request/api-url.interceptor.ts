import { HttpInterceptorFn } from '@angular/common/http';
import { API_PATHS } from 'shared/constants/apiPaths';

export const apiURLInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({ url: `${API_PATHS.ROOT}/${req.url}` });

  return next(req);
};
