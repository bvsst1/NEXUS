import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const validLength = value.length >= 6 && value.length <= 18;
  if (!hasUpperCase || !hasNumber || !validLength) {
    return { passwordStrength: true };
  }
  return null;
}

export function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    return { passwordsMismatch: true };
  }
  return null;
}

export function ageValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const birthDate = new Date(control.value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age < 13 ? { underAge: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]],
      confirmPassword: ['', Validators.required],
      birthDate: ['', [Validators.required, ageValidator]],
      address: ['']
    }, { validators: passwordsMatchValidator });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log('Form submitted', this.registerForm.value);
    }
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
