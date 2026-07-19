import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, NgIf, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'student-course-portal';

  constructor(public loadingService: LoadingService) {}
}