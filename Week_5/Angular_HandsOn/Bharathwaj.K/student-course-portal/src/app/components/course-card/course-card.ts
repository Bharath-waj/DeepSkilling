import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import { toggleEnrollment } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, AsyncPipe, Highlight, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  isEnrolled$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    // recalculates automatically whenever enrolledIds changes in the
    // store - no manual subscribing/unsubscribing needed since the
    // async pipe in the template handles that
    this.isEnrolled$ = this.store.select(selectEnrolledIds).pipe(
      map((ids) => ids.includes(this.course?.id))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        'Course changed — previous:',
        changes['course'].previousValue,
        'current:',
        changes['course'].currentValue
      );
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  viewDetails(): void {
    this.router.navigate(['courses', this.course.id]);
  }

  // have to check current enrolled state before dispatching - the store
  // doesn't have a "toggle" action, just separate enroll/unenroll ones
  onEnrollClick(): void {
   this.store.dispatch(toggleEnrollment({ courseId: this.course.id }));
   this.enrollRequested.emit(this.course.id);
  }

  get cardClasses() {
    return {
      'card--full': this.course?.credits >= 4,
      expanded: this.isExpanded
    };
  }

  get borderColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  }
}