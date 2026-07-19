import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

// the '[Course]' prefix is just a convention so redux devtools groups
// these together in the timeline - makes it way easier to filter
export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);