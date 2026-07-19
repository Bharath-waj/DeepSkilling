import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'courses', component: CourseList },
  { path: 'courses/:id', component: CourseDetail },
  { path: 'enroll', component: EnrollmentForm, canActivate: [authGuard] },
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentForm,
    canDeactivate: [unsavedChangesGuard]
  },
  { path: 'profile', component: StudentProfile, canActivate: [authGuard] },
  { path: '**', component: NotFound } // wildcard MUST stay last
];