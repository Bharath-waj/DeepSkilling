import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { CourseList } from './course-list';
import { Course } from '../../models/course.model';
import { selectAllCourses, selectCoursesLoading } from '../../store/course/course.selectors';

describe('CourseListComponent (NgRx-connected)', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideMockStore({
          initialState: {
            course: { courses: mockCourses, loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          }
        }),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    // MockStore replaces the real store entirely - no reducers or
    // effects actually run, just set whatever state the test needs
    store = TestBed.inject(MockStore);
  });

  it('should render course cards from the initial store state', () => {
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  it('should show the loading indicator when loading is true', () => {
    store.overrideSelector(selectCoursesLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('p'));
    expect(loadingEl.nativeElement.textContent).toContain('Loading');
  });
});