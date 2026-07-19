import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

// functional guards are the new default (not class-based anymore) -
// inject() lets you grab services without needing a constructor here
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isLoggedIn) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
