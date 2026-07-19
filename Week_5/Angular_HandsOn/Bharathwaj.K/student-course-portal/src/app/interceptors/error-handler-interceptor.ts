import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        router.navigate(['/']);
      } else if (error.status === 500) {
        // just a console alert for now - could wire up a real toast/banner
        // component later if the exercise wants a proper notification
        console.error('Server error - something went wrong on the backend');
      }
      return throwError(() => error);
    })
  );
};