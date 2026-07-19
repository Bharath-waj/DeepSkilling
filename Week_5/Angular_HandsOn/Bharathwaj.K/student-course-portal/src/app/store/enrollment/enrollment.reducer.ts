import { createReducer, on } from '@ngrx/store';
import { toggleEnrollment } from './enrollment.actions';

export interface EnrollmentState {
  enrolledCourseIds: number[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: []
};

export const enrollmentReducer = createReducer(
  initialEnrollmentState,
  on(toggleEnrollment, (state, { courseId }) => {
    // reducer does the enrolled/not-enrolled check itself now - component
    // just fires one action and doesn't need to know the current state
    const isCurrentlyEnrolled = state.enrolledCourseIds.includes(courseId);
    return {
      enrolledCourseIds: isCurrentlyEnrolled
        ? state.enrolledCourseIds.filter((id) => id !== courseId)
        : [...state.enrolledCourseIds, courseId]
    };
  })
);
