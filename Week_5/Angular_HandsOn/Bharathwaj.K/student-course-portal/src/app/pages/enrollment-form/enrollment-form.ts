import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})

export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;

  submitted = false;

  onSubmit(form: NgForm): void {
    // just logging for now to see what the form object actually looks
    // like - turns out form.value only has the fields with a name attr
    console.log('form value:', form.value);
    console.log('form valid:', form.valid);

    if (form.valid) {
      this.submitted = true;
    }
  }
}