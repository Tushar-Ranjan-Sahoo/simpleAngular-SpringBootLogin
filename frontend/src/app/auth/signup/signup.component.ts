import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container">
      <h1>Sign Up</h1>
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            id="name" 
            type="text" 
            formControlName="name"
            placeholder="Enter your name">
          <div class="error-message" *ngIf="signupForm.get('name')?.hasError('required') && signupForm.get('name')?.touched">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email" 
            type="email" 
            formControlName="email"
            placeholder="Enter your email">
          <div class="error-message" *ngIf="signupForm.get('email')?.hasError('required') && signupForm.get('email')?.touched">
            Email is required
          </div>
          <div class="error-message" *ngIf="signupForm.get('email')?.hasError('email') && signupForm.get('email')?.touched">
            Invalid email format
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password" 
            type="password" 
            formControlName="password"
            placeholder="Enter your password">
          <div class="error-message" *ngIf="signupForm.get('password')?.hasError('required') && signupForm.get('password')?.touched">
            Password is required
          </div>
        </div>

        <div class="error-message" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>

        <div class="success-message" *ngIf="successMessage">
          {{ successMessage }}
        </div>

        <button type="submit" [disabled]="signupForm.invalid || isLoading">
          {{ isLoading ? 'Signing up...' : 'Sign Up' }}
        </button>
      </form>

      <div class="link">
        <a routerLink="/login">Already have an account? Login</a>
      </div>
    </div>
  `
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = response.message;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
        }
      });
    }
  }
}

