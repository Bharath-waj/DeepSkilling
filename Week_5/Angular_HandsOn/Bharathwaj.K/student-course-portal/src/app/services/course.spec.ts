import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course';
import { Course } from '../models/course.model';

// jasmine's global `fail` helper isn't declared by TypeScript in some configs
declare function fail(message?: string): void;

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // this is what actually catches accidental extra http calls - if a test
  // leaves an unhandled request lying around, verify() will fail it
  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch courses via GET', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle a 500 error', () => {
    service.getCourses().subscribe({
      next: () => fail('expected an error, not success'),
      error: (err) => {
        expect(err.message).toContain('Failed to load courses');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    // retry(2) means it'll actually hit this endpoint 3 times total
    // (1 original + 2 retries) before finally erroring out
    req.flush('server error', { status: 500, statusText: 'Server Error' });

    const retry1 = httpMock.expectOne('http://localhost:3000/courses');
    retry1.flush('server error', { status: 500, statusText: 'Server Error' });

    const retry2 = httpMock.expectOne('http://localhost:3000/courses');
    retry2.flush('server error', { status: 500, statusText: 'Server Error' });
  });
});