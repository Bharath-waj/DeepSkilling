import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  // hardcoded true for now - would come from an actual login flow later
  isLoggedIn = true;
}