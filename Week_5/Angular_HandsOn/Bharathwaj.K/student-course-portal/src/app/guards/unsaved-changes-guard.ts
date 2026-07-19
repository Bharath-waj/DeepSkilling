import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentForm } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

// component needs a canExit() method (or similar) so the guard knows
// whether the form is dirty - defining that interface-like contract below
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentForm> = (component) => {
  return component.canDeactivate();
};