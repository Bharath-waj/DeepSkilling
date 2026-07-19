import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CourseService } from './course';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  // fake endpoint just for demonstrating switchMap - json-server won't
  // actually have this route unless i add a students array filtered
  // by course, so this is more about the pattern than a real working call
  getStudentsByCourse(courseId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/students?courseId=${courseId}`);
  }

  // switchMap cancels whatever the PREVIOUS inner call was doing if a new
  // courseId comes in before the old one finishes - stops old, slow
  // responses from overwriting newer ones (out-of-order results)
  selectCourseAndLoadStudents(courseId$: Observable<number>): Observable<any> {
    return courseId$.pipe(switchMap((courseId) => this.getStudentsByCourse(courseId)));
  }
}