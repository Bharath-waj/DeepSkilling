import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // wrapping show() in a promise microtask so it fires just AFTER
  // angular's current change detection pass finishes, instead of
  // during it - fixes the "changed after checked" error
  Promise.resolve().then(() => loadingService.show());

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};