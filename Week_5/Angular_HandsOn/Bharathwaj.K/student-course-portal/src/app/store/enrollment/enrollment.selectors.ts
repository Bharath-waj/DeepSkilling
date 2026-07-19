import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds
);

// cross-slice selector - combines course state AND enrollment state
// together to get full course objects for whatever's enrolled, without
// duplicating the course data inside the enrollment slice
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (allCourses, enrolledIds) => allCourses.filter((c) => enrolledIds.includes(c.id))
);