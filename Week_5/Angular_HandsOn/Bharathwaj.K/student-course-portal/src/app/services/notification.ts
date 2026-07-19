import { Injectable } from '@angular/core';

@Injectable()
// no providedIn: 'root' here on purpose - this one gets provided at the
// component level instead, see notification.ts component file
export class NotificationService {
  private messages: string[] = [];

  addMessage(msg: string): void {
    this.messages.push(msg);
  }

  getMessages(): string[] {
    return this.messages;
  }
}