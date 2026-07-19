import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailable = 0;

  constructor(private courseService: CourseService) {}

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.coursesAvailable = courses.length;
      }
    });
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}