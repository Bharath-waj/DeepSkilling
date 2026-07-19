import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor],
  // providing it here instead of root means every instance of
  // NotificationComponent gets its OWN copy of the service - not shared
  // app-wide like CourseService is. useful if you had say 2 of these
  // components on screen and didn't want them mixing up each other's messages
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  constructor(private notificationService: NotificationService) {
    this.notificationService.addMessage('Welcome to the portal!');
  }

  get messages(): string[] {
    return this.notificationService.getMessages();
  }
}
