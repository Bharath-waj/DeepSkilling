import { HttpInterceptorFn } from '@angular/common/http';

// functional interceptor - just a plain function, no class needed.
// clones the request because HttpRequest objects are immutable, can't
// just mutate the headers directly
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });
  return next(clonedReq);
};