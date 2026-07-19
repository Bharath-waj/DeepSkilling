import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({ initialState: { enrollment: { enrolledCourseIds: [] } } }),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the course name', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const nameEl = fixture.debugElement.query(By.css('h3'));
    expect(nameEl.nativeElement.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested with the course id when Enroll is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    // vitest uses vi.spyOn, not the global spyOn jasmine gives you
    vi.spyOn(component.enrollRequested, 'emit');

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log to console on ngOnChanges', () => {
    vi.spyOn(console, 'log');

    component.ngOnChanges({
      course: {
        previousValue: undefined,
        currentValue: mockCourse,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(console.log).toHaveBeenCalled();
  });

  it('should toggle isExpanded when Show Details is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    expect(component.isExpanded).toBe(false);

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.isExpanded).toBe(true);
  });
});