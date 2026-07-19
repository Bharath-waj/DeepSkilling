import { createAction, props } from '@ngrx/store';

// one action instead of two - the reducer decides whether to add or
// remove the id, component doesn't need to check current state anymore
export const toggleEnrollment = createAction(
  '[Enrollment] Toggle Enrollment',
  props<{ courseId: number }>()
);