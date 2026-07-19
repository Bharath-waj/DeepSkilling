import { Component } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile {
  // this now always reflects the live store state - fixes the stale
  // data issue from hands-on 6 where enrolling AFTER landing on this
  // page never showed up until you navigated away and back
  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }
}