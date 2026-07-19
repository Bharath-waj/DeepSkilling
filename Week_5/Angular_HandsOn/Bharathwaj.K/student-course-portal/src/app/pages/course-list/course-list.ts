import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  // swapping the service-subscribe pattern for the store now - the
  // component doesn't know or care HOW the data gets loaded anymore,
  // just asks the store for it via the selector
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  selectedCourseId: number | null = null;
  searchTerm = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
    // this just fires off the action - the effect catches it, does the
    // actual http call, and dispatches success/failure back
    this.store.dispatch(loadCourses());
  }

  onSearchChange(): void {
    this.router.navigate(['courses'], {
      queryParams: { search: this.searchTerm || null }
    });
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}