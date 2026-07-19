import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

// custom validator - just a plain function, doesn't need to be a class
// or anything fancy. returns an error object if invalid, null if fine
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (value && value.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// async validator - has to return a Promise or Observable, angular waits
// for it to resolve before deciding if the field is valid
function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (control.value && control.value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  
  canDeactivate(): boolean {
    if (this.enrollForm.dirty) {
      return window.confirm('You have unsaved changes. Leave?');
    }
    return true;
  }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // typed getter so I don't have to keep casting to FormArray everywhere
  // in the template - just call this.additionalCourses and it's already typed
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log('enrollForm.value:', this.enrollForm.value);
    // getRawValue includes disabled controls too, value doesn't - don't
    // have any disabled controls yet but good to know the difference
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());
  }
}