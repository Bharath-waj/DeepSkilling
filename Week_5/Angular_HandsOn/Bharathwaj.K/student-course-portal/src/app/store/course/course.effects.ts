import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CourseService } from '../../services/course';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

@Injectable()
export class CourseEffects {
  // using inject() instead of constructor params - this runs immediately
  // when the field is set, so actions$ is actually defined by the time
  // createEffect() below tries to use it. constructor injection was
  // running too late for these field initializers apparently
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => loadCoursesSuccess({ courses })),
          catchError((error) => of(loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );
}